import { Contract, validateWritableContract } from "./types/contract";
import type { TransactionReceipt, PromiEvent } from "web3-core";
import { Address } from ".";
import { EventEmitter } from "eventemitter3";

export interface IShop {
  minConfirmNum: number;

  buy(
    nftId: string,
    eventEmitter: IBuyEventEmitterEmits,
    info?: { sellingPrice: bigint; paymentCurrency: Address },
    minConfirmNum?: number
  ): Promise<{ receipt: TransactionReceipt; nftId: string }>;
}

export type ConfirmFunc = (
  confNumber: number,
  nftId: string,
  receipt: TransactionReceipt,
  lastBlockHash?: string
) => void;

export enum BuyEvent {
  startApprove = "startApprove",
  approved = "approved",
  confirm = "confirm",
  accepted = "accepted",
}

export interface IBuyEventEmitter {
  on(
    event: BuyEvent.startApprove | BuyEvent.approved,
    callback: () => void
  ): void;
  on(event: BuyEvent.confirm, callback: (confNum: number) => void): void;
  on(
    event: BuyEvent.accepted,
    callback: (result: { receipt: TransactionReceipt; nftId: string }) => void
  ): void;
}

export interface IBuyEventEmitterEmits {
  emit(event: BuyEvent.startApprove | BuyEvent.approved): void;
  emit(event: BuyEvent.confirm, confNum: number): void;
  emit(
    event: BuyEvent.accepted,
    result: { receipt: TransactionReceipt; nftId: string }
  ): void;
}

export class BuyEventEmitter
  extends EventEmitter
  implements IBuyEventEmitter, IBuyEventEmitterEmits {}

export class Shop implements IShop {
  private contract: Contract;
  private _ERC20Contract: Contract;
  minConfirmNum: number;

  constructor(contract: Contract, _ERC20Contract: Contract) {
    validateWritableContract(contract);
    this.contract = contract;
    this.minConfirmNum = 12;
    this._ERC20Contract = _ERC20Contract;
  }

  async buy(
    nftId: string,
    eventEmitter: IBuyEventEmitterEmits,
    info?: { sellingPrice: bigint; paymentCurrency: Address },
    minConfirmNum?: number
  ) {
    if (!info) {
      const [_info, paymentCurrency] = await Promise.all([
        this.contract.methods.getNFTInfoByNFTID(nftId).call(),
        this.contract.methods.getTokenAddrByNFTId(nftId).call(),
      ]);
      info = {
        sellingPrice: _info.shill_price,
        paymentCurrency: new Address(paymentCurrency),
      };
    }

    const nftIdInBigInt = BigInt(nftId);
    let result;
    if (info.paymentCurrency.isZeroAddress()) {
      result = await this.acceptShill(
        nftIdInBigInt,
        info.sellingPrice,
        minConfirmNum,
        (confNumber, nftId, receipt) => {
          eventEmitter.emit(BuyEvent.confirm, confNumber);
        }
      );
    } else {
      // TODO: assert.
      eventEmitter.emit(BuyEvent.startApprove);
      const approveReceipt = await this.approve(
        info.paymentCurrency,
        info.sellingPrice
      );
      eventEmitter.emit(BuyEvent.approved);
      result = await this.acceptShill(
        nftIdInBigInt,
        0n,
        minConfirmNum,
        (confNum) => eventEmitter.emit(BuyEvent.confirm, confNum)
      );
    }
    eventEmitter.emit(BuyEvent.accepted, result);
    return result;
  }

  private async approve(tokenAddress: Address, amount: bigint) {
    const contract = this._ERC20Contract;
    contract.options.address = tokenAddress.value;

    return await new Promise<TransactionReceipt>((resolve, reject) => {
      const promiEvent: PromiEvent<TransactionReceipt> = contract.methods
        .approve(this.contract.options.address, amount)
        .send();
      promiEvent.on("receipt", resolve).on("error", reject);
    });
  }

  // Send a transaction to the acceptShill method of the contract.
  // If the payment is made using tokens, just set the sellingPrice
  // parameter to zero value.
  private async acceptShill(
    nftId: bigint,
    sellingPrice: bigint,
    minConfirmNum?: number,
    onConfirm?: ConfirmFunc
  ): Promise<{ receipt: TransactionReceipt; nftId: string }> {
    minConfirmNum = minConfirmNum ?? this.minConfirmNum;

    return await new Promise<{ receipt: TransactionReceipt; nftId: string }>(
      (resolve, reject) => {
        const promiEvent: PromiEvent<TransactionReceipt> = this.contract.methods
          .acceptShill(nftId)
          .send({ value: sellingPrice.toString() });
        promiEvent
          .on("confirmation", (number, receipt, latestBlockHash) => {
            const nftId = receipt.events.Transfer.returnValues.tokenId;
            if (number <= minConfirmNum && onConfirm)
              onConfirm(number, nftId, receipt, latestBlockHash);
            if (number >= minConfirmNum) {
              resolve({ receipt, nftId });
            }
          })
          .on("error", (err) => reject(err));
      }
    );
  }
}
