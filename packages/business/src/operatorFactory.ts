import ContractAbi from "./abi";
import type {Contract} from "./types/contract";
import {Address} from "./types/address";
import Web3 from "web3";
import {Publisher} from "./publish";
import type {IPublisher} from "./publish";

export interface IOperatorFactory {
	get publisher(): IPublisher;
}

export class OperatorFactory implements IOperatorFactory {
	private readonly contract: Contract;
	minConfirmNum: number;

	constructor(
		web3: Web3,
		sender: Address | string,
		contractAddress: Address | string,
		minConfirmNum = -1
	) {
		if (typeof sender === "string") sender = new Address(sender);
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
}
