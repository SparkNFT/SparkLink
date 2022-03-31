import ContractAbi from "./abi";
import type { Contract } from "./types/contract";
import { Address } from "./types/address";
import type Web3 from "web3";
import { Publisher } from "./publisher";
import type { IPublisher } from "./publisher";
import { IShop, Shop } from "./shop";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ERC20ABI from "erc-20-abi";

export interface IOperatorFactory {
  get publisher(): IPublisher;
  get shop(): IShop;
}

export class OperatorFactory implements IOperatorFactory {
  private readonly contract: Contract;
  minConfirmNum: number;
  private web3: Web3;
  private sender: Address;

  constructor(
    web3: Web3,
    sender: Address | string,
    contractAddress: Address | string,
    minConfirmNum = -1
  ) {
    this.web3 = web3;
    if (typeof sender === "string") sender = new Address(sender);
    this.sender = sender;
    if (typeof contractAddress === "string")
      contractAddress = new Address(contractAddress);
    this.contract = new web3.eth.Contract(ContractAbi, contractAddress.value);
    this.contract.options.from = sender.value;
    this.minConfirmNum = minConfirmNum;
  }

  get publisher() {
    const publisher = new Publisher(this.contract);
    if (this.minConfirmNum > 0) publisher.minConfirmNum = this.minConfirmNum;
    return publisher;
  }

  get shop() {
    const contract = new this.web3.eth.Contract(ERC20ABI);
    contract.options.from = this.sender.value;
    const shop = new Shop(this.contract, contract);
    if (this.minConfirmNum > 0 ) shop.minConfirmNum = this.minConfirmNum;
    return shop;
  }
}
