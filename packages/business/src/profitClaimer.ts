import type { TransactionReceipt, PromiEvent } from "web3-core";
import { EventEmitter } from "eventemitter3";
import { Contract, validateWritableContract } from "./types/contract";

export interface IProfitClaimer {
  minConfirmNum: number;

  claim(
    nftId: string,
    eventEmitter: IClaimedEventEmitterEmits,
    minConfirmNum?: number
  ): Promise<{ receipt: TransactionReceipt }>;
}

export enum ClaimEvent {
  claimed = "claimed",
  confirm = "confirm",
}

export interface IClaimedEventEmitter {
  on(event: ClaimEvent.confirm, callback: (confNum: number) => void): void;
  on(event: ClaimEvent.claimed, callback: () => void);
}

export interface IClaimedEventEmitterEmits {
  emit(event: ClaimEvent.confirm, confNum: number): void;
  emit(event: ClaimEvent.claimed): void;
}

export class ClaimEventEmitter
  extends EventEmitter
  implements IClaimedEventEmitter, IClaimedEventEmitterEmits {}

export class ProfitClaimer implements IProfitClaimer {
  private contract: Contract;
  minConfirmNum: number;

  constructor(contract: Contract) {
    validateWritableContract(contract);
    this.contract = contract;
    this.minConfirmNum = 12;
  }

  async claim(
    nftId: string,
    eventEmitter: IClaimedEventEmitterEmits,
    minConfirmNum?: number
  ): Promise<{ receipt: TransactionReceipt }> {
    const result = await this.claimProfit(
      BigInt(nftId),
      minConfirmNum,
      (confNumber) => {
        eventEmitter.emit(ClaimEvent.confirm, confNumber);
      }
    );
    eventEmitter.emit(ClaimEvent.claimed);
    return result;
  }

  private claimProfit(
    nftId: bigint,
    minConfirmNum?: number,
    onConfirm?: (confNum) => void
  ): Promise<{ receipt: TransactionReceipt }> {
    minConfirmNum = minConfirmNum ?? this.minConfirmNum;

    return new Promise<{ receipt: TransactionReceipt }>((reoslve, reject) => {
      const promiEvent: PromiEvent<TransactionReceipt> = this.contract.methods
        .claimProfit(nftId)
        .send();
      promiEvent.on("confirmation", (number, receipt) => {
        if (number <= minConfirmNum && onConfirm) {
          onConfirm(number);
        }
        if (number >= minConfirmNum) reoslve({ receipt });
      });
      promiEvent.on("error", (err) => reject(err));
    });
  }
}
