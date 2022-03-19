import type {PromiEvent} from "web3-core";
import {Address} from "./types/address";
import type {Contract} from "./types/contract";
import {hexToBytes, bytesToHex} from "web3-utils";
import {TransactionReceipt} from "web3-core";

export interface IPublisher {
	minConfirmNum: number;

	publish(
		form: IPublishForm,
		minConfirmNum?: number,
		onConfirm?: ConfirmFunc
	): Promise<{ receipt: TransactionReceipt; rootNftId: string }>;
}

export type ConfirmFunc = (
	confNumber: number,
	rootNftId: string,
	receipt: TransactionReceipt,
	latestBlockHash?: string
) => void;

export class Publisher implements IPublisher {
	private contract: Contract;
	minConfirmNum: number;

	constructor(contract: Contract) {
		if (!contract.options.address)
			throw new Error("Contract Address should be specified.");
		else if (!contract.options["from"])
			throw new Error("Contract should have a sender address.");
		else this.contract = contract;
		this.minConfirmNum = 12;
	}

	publish(
		form: IPublishForm,
		minConfirmNum = this.minConfirmNum,
		onConfirm?: ConfirmFunc
	) {
		const promiEvent: PromiEvent<TransactionReceipt> = this.contract.methods
			.publish(
				form.sellPrice,
				form.royaltyFeePercentage,
				form.maxShareTimes,
				form.ipfsHashWithoutMultiHash,
				form.tokenAddress.value,
				form.freeForSecondLevel,
				form.nonCommercial,
				form.noDerivativeWorks
			)
			.send();
		return new Promise<{ receipt: TransactionReceipt; rootNftId: string }>(
			function (resolve, reject) {
				promiEvent
					.on("confirmation", async (number, receipt, latestBlockHash) => {
						//console.log(number);
						const rootNftId = receipt.events.Publish.returnValues.rootNFTId;
						if (number <= minConfirmNum && onConfirm) onConfirm(number, rootNftId, receipt, latestBlockHash);
						if (number === minConfirmNum) {
							resolve({
								receipt: receipt,
								rootNftId: receipt.events.Publish.returnValues.rootNFTId,
							});
						}

					})
					.on("error", (error) => reject(error));
			}
		);
	}
}

export interface IPublishForm {
	sellPrice: bigint;
	royaltyFeePercentage: number;
	maxShareTimes: number;
	// a hex string whose length is 34 bytes (starts with "0x", 68 hex characters, "0x" is not included).
	ipfsHash: string;

	// a hex string whose length is 32 bytes (starts with "0x", 64 hex characters, "0x" is not included).
	get ipfsHashWithoutMultiHash(): string;

	freeForSecondLevel: boolean;
	nonCommercial: boolean;
	noDerivativeWorks: boolean;
	tokenAddress: Address;
}

export class PublishForm implements IPublishForm {
	static readonly ZERO_ADDRESS = new Address(
		"0x0000000000000000000000000000000000000000"
	);

	sellPrice: bigint;
	royaltyFeePercentage: number;
	maxShareTimes: number;
	ipfsHash: string;
	private _ipfsHashWithoutMultiHash: string;
	get ipfsHashWithoutMultiHash() {
		if (this._ipfsHashWithoutMultiHash) return this._ipfsHashWithoutMultiHash;
		else {
			const bytes = hexToBytes(this.ipfsHash);
			this._ipfsHashWithoutMultiHash = bytesToHex(bytes.slice(2));
			return this._ipfsHashWithoutMultiHash;
		}
	}

	freeForSecondLevel: boolean;
	nonCommercial: boolean;
	noDerivativeWorks: boolean;
	tokenAddress: Address;

	constructor(
		sellPrice: bigint,
		royaltyFeePercentage: number,
		maxShareTimes: number,
		ipfsHash: string,
		freeForSecondLevel: boolean,
		nonCommercial: boolean,
		noDerivativeWorks: boolean,
		tokenAddress = PublishForm.ZERO_ADDRESS
	) {
		this.sellPrice = sellPrice;
		this.royaltyFeePercentage = royaltyFeePercentage;
		this.maxShareTimes = maxShareTimes;
		this.ipfsHash = ipfsHash;
		this.freeForSecondLevel = freeForSecondLevel;
		this.nonCommercial = nonCommercial;
		this.noDerivativeWorks = noDerivativeWorks;
		this.tokenAddress = tokenAddress;
	}
}
