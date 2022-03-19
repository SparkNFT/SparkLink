import {Address} from "./types/address";
import type {
	IAuthorizationPayload,
	IClaimPinataApiKeyReturnValue,
	IKeyServerClient,
} from "./client/keyserver";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JSZip from "jszip";
import {EventEmitter} from "eventemitter3";
import type {IMetadata} from "./metadata";
import {toAttributes} from "./metadata";
import {fileToIpfsCid0, plainObjectToIpfsCid0} from "./utils/toIpfsCid0";
import {ipfsCid0ToMultiHash} from "./utils/ipfsCid0ToMultiHash";
import {multiHashToHash} from "./utils/multiHashToHash";
import type {IOperatorFactory} from "./operatorFactory";
import type {ConfirmFunc, IPublisher} from "./publish";
import {PublishForm} from "./publish";
import type {TransactionReceipt} from "web3-core";
import {encrypt} from "./utils/crypt";
import pinataClient from "@pinata/sdk";
import {Readable} from "stream";
import {IUniFile} from "./utils/uniFile";

type InputFile = IUniFile;

export interface IUserInputForm {
	name: string;
	percentageOfEarnings: number;
	paymentCurrency: Address;
	// In wei.
	sellingPrice: bigint;
	maxShareTimes: number;
	allowSecondaryCreation: boolean;
	allowCommercialUsage: boolean;
	freeForSecondLevel: boolean;
	encrypted: boolean;
	description: string;
	cover: InputFile;
	content: InputFile[];
}

export interface IUploadConfig {
	cdnUrl: string;
	keyServerClient: IKeyServerClient;
	operatorFactory: IOperatorFactory;
	account: Address;
	chainId: number;
	sign: (payloadStr: string) => Promise<string>;
}

export interface IUploadEventEmitter {
	on(event: "beginGeneratingZip", callback: () => void);

	on(
		event: "processingZip",
		callback: (percent: number, currentFile: string) => void
	);

	on(event: "zipGenerated", callback: (content: Uint8Array) => void);

	on(event: "encrypted", callback: (encryptedContent: Uint8Array) => void);

	on(event: "publishConfirmation", callback: ConfirmFunc);

	on(
		event: "published",
		callback: (receipt: {
			receipt: TransactionReceipt;
			rootNftId: string;
		}) => void
	);

	on(
		event: "signedAuthorizationPayload",
		callback: (payload: IAuthorizationPayload) => void
	);


	on(
		event: "coverPined" | "contentPined" | "metadataPined",
		callback: (ipfsHash: string, pinSize: number) => void
	);
}

interface IUploadEventEmitterEmits {
	emit(event: "beginGeneratingZip");

	emit(event: "processingZip", percent: number, currentFile: string);

	emit(event: "zipGenerated", content: Uint8Array);

	emit(event: "encrypted", encryptedContent: Uint8Array);

	emit(
		event: "publishConfirmation",
		confNumber: number,
		rootNftId: string,
		receipt: TransactionReceipt,
		latestBlockHash?: string
	);

	emit(
		event: "published",
		receipt: { receipt: TransactionReceipt; rootNftId: string }
	);

	emit(event: "signedAuthorizationPayload", payload: IAuthorizationPayload);

	emit(
		event: "coverPined" | "contentPined" | "metadataPined",
		ipfsHash: string,
		pinSize: number
	);
}

export class UploadEventEmitter
	extends EventEmitter
	implements IUploadEventEmitter, IUploadEventEmitterEmits {
}

async function generateZip(
	eventEmitter: IUploadEventEmitterEmits,
	files: InputFile[],
	encrypted: boolean
): Promise<{ zipFile: Uint8Array; password?: string }> {
	eventEmitter.emit("beginGeneratingZip");
	const zip = new JSZip();
	for (const file of files) {
		zip.file(file.path, file.content("ArrayBuffer"));
	}
	let zipFile = await zip.generateAsync(
		{
			type: "uint8array",
			compression: "DEFLATE",
			compressionOptions: {level: 5},
		},
		(metadata) =>
			eventEmitter.emit("processingZip", metadata.percent, metadata.currentFile)
	)
	eventEmitter.emit("zipGenerated", zipFile);
	let password;
	if (encrypted) {
		const encryptedResult = encrypt(zipFile);
		const encrypted = encryptedResult.encrypted;
		password = encryptedResult.password;
		const textEncoder = new TextEncoder();
		zipFile = new Uint8Array(textEncoder.encode(encrypted));
		eventEmitter.emit("encrypted", zipFile);
	}
	return {zipFile, password};
}

async function calculateCid0(
	coverFile: Uint8Array,
	zipFile: Uint8Array
): Promise<{ coverCid0: string; zipFileCid0: string }> {
	const coverCid0 = await fileToIpfsCid0(coverFile);
	const zipFileCid0 = await fileToIpfsCid0(zipFile);
	return {coverCid0, zipFileCid0};
}

async function calculateMetadataIpfsHash(metadata: object) {
	const metadataCid0 = await plainObjectToIpfsCid0(metadata);
	const metadataMultiHash = ipfsCid0ToMultiHash(metadataCid0);
	// This is what we call ipfsHash.
	const metadataSha256Hash = multiHashToHash(metadataMultiHash);
	return metadataSha256Hash;
}

async function publishToContract(
	eventEmitter: IUploadEventEmitterEmits,
	input: IUserInputForm & { metadataIpfsHash },
	publisher: IPublisher
) {
	const receipt = await publisher.publish(
		new PublishForm(
			input.sellingPrice,
			input.percentageOfEarnings,
			input.maxShareTimes,
			input.metadataIpfsHash,
			input.freeForSecondLevel,
			!input.allowCommercialUsage,
			!input.allowSecondaryCreation,
			input.paymentCurrency
		),
		undefined,
		(confNumber, rootNftId, receipt, latestBlockHash) => {
			eventEmitter.emit(
				"publishConfirmation",
				confNumber,
				rootNftId,
				receipt,
				latestBlockHash
			);
		}
	);
	eventEmitter.emit("published", receipt);
	return receipt.rootNftId;
}

async function claimApiKey(
	eventEmitter: IUploadEventEmitterEmits,
	client: IKeyServerClient,
	payload: IBasePayload,
	sign: (str: string) => Promise<string>
): Promise<IClaimPinataApiKeyReturnValue> {
	const str = JSON.stringify(payload);
	const signature = await sign(str);
	const actualPayload = {payload, signature};
	eventEmitter.emit("signedKeyClaimPayload", actualPayload);
	return await client.claimPinataApiKey(actualPayload);
}

async function storeEncryptPassword(
	client: IKeyServerClient,
	payload: IBasePayload & { password: string },
	sign: (str: string) => Promise<string>
) {
	const str = JSON.stringify(payload);
	const signature = await sign(str);
	const actualPayload = {payload, signature};
	return await client.storeEncryptPassword(actualPayload);
}

async function uploadToPinService(
	eventEmitter: IUploadEventEmitterEmits,
	files: { cover: Uint8Array; content: Uint8Array; metadata: IMetadata },
	keyPair: { apiKey: string; secretApiKey: string }
): Promise<{ ipfsHash: { cover: string; content: string; metadata: string } }> {
	const client = pinataClient(keyPair.apiKey, keyPair.secretApiKey);
	const {IpfsHash: coverIpfsHash, PinSize: coverPinSize} =
		await client.pinFileToIPFS(Readable.from(files.cover));
	eventEmitter.emit("coverPined", coverIpfsHash, coverPinSize);
	const {IpfsHash: contentIpfsHash, PinSize: contentPinSize} =
		await client.pinFileToIPFS(Readable.from(files.content));
	eventEmitter.emit("contentPined", contentIpfsHash, contentPinSize);
	const {IpfsHash: metadataIpfsHash, PinSize: metadataPinSize} =
		await client.pinJSONToIPFS(files.metadata);
	eventEmitter.emit("metadataPined", metadataIpfsHash, metadataPinSize);
	return {
		ipfsHash: {
			cover: coverIpfsHash,
			content: contentIpfsHash,
			metadata: metadataIpfsHash,
		},
	};
}

function getZipPathFromFile(file: File) {
	return file.webkitRelativePath ?? file.name;
}

export interface IUploader {
	upload(userInputForm: IUserInputForm): {
		eventEmitter: IUploadEventEmitter;
		uploadPromise: Promise<void>;
	};
}

export class Uploader implements IUploader {
	private readonly config: IUploadConfig;

	constructor(config: IUploadConfig) {
		this.config = config;
	}

	upload(userInputForm: IUserInputForm) {
		const eventEmitter = new UploadEventEmitter();
		const uploadPromise = new Promise<void>((resolve, reject) => {
			setImmediate(async () => {
				try {
					await this._upload(eventEmitter, userInputForm);
				} catch (error) {
					reject(error);
				}
				resolve();
			});
		});
		return {eventEmitter, uploadPromise};
	}

	async _upload(
		eventEmitter: IUploadEventEmitterEmits,
		userInputForm: IUserInputForm
	) {
		const config = this.config;
		const coverBinary = await userInputForm.cover.content("Uint8Array");
		const contentFiles = userInputForm.content;
		const encrypted = userInputForm.encrypted;

		const {zipFile, password} = await this.generateZip(
			eventEmitter,
			contentFiles,
			encrypted
		);

		const {coverCid0, zipFileCid0: contentCid0} = await this.calculateCid0(
			coverBinary,
			zipFile
		);

		const metadata: IMetadata = {
			name: userInputForm.name,
			description: userInputForm.description,
			image: new URL(coverCid0, config.cdnUrl).href,
			attributes: toAttributes({
				bonusPercentage: userInputForm.percentageOfEarnings,
				fileAddress: new URL(contentCid0, config.cdnUrl).href,
				filenameExtension: "zip",
				encrypted: encrypted,
			}),
			version: "1.0.0",
		};
		if (encrypted) {
			metadata.encryptMethod = "AES";
		}

		// This is what we call ipfsHash.
		const metadataSha256Hash = await this.calculateMetadataIpfsHash(metadata);

		const nftId = await this.publishToContract(
			eventEmitter,
			{
				...userInputForm,
				metadataIpfsHash: metadataSha256Hash,
			},
			config.operatorFactory.publisher
		);

		const basePayload = {
			account: config.account.toString(),
			chainId: config.chainId,
			nft_id: nftId,
			nonce =
		};

		const apiKeyPair = await this.claimApiKey(
			eventEmitter,
			config.keyServerClient,
			basePayload,
			config.sign
		);

		if (encrypted) {
			await this.storeEncryptPassword(
				config.keyServerClient,
				{...basePayload, password},
				config.sign
			);
		}

		// This are the files that need to be uploaded.
		const files = {cover: coverBinary, content: zipFile, metadata};

		await this.uploadToPinService(eventEmitter, files, apiKeyPair);
	}

	private async generateZip(
		eventEmitter: IUploadEventEmitterEmits,
		files: InputFile[],
		encrypted: boolean
	) {
		return await generateZip(eventEmitter, files, encrypted);
	}

	private async calculateCid0(coverFile: Uint8Array, zipFile: Uint8Array) {
		return await calculateCid0(coverFile, zipFile);
	}

	private async calculateMetadataIpfsHash(metadata: object) {
		return await calculateMetadataIpfsHash(metadata);
	}

	private async publishToContract(
		eventEmitter: IUploadEventEmitterEmits,
		input: IUserInputForm & { metadataIpfsHash },
		publisher: IPublisher
	) {
		return await publishToContract(eventEmitter, input, publisher);
	}

	private async claimApiKey(
		eventEmitter: IUploadEventEmitterEmits,
		client: IKeyServerClient,
		payload: IBasePayload,
		sign: (str: string) => Promise<string>
	) {
		return await claimApiKey(eventEmitter, client, payload, sign);
	}

	private async storeEncryptPassword(
		client: IKeyServerClient,
		payload: IBasePayload & { password: string },
		sign: (str: string) => Promise<string>
	) {
		return await storeEncryptPassword(client, payload, sign);
	}

	private async uploadToPinService(
		eventEmitter: IUploadEventEmitterEmits,
		files: { cover: Uint8Array; content: Uint8Array; metadata: IMetadata },
		keyPair: { apiKey: string; secretApiKey: string }
	) {
		return await uploadToPinService(eventEmitter, files, keyPair);
	}
}
