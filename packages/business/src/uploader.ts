import {Address} from "./types/address";
import type {
    ClientBuilder,
    IClaimPinataApiKeyAndStoreEncryptPasswordPayload,
} from "./client/keyServer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JSZip from "jszip";
import {EventEmitter} from "eventemitter3";
import type {IMetadata} from "./metadata";
import {toAttributes} from "./metadata";
import {fileToIpfsCid0, plainObjectToIpfsCid0} from "./utils/toIpfsCid0";
import {ipfsCid0ToMultiHash} from "./utils/ipfsCid0ToMultiHash";
import type {IOperatorFactory} from "./operatorFactory";
import type {ConfirmFunc, IPublisher} from "./publisher";
import {PublishForm} from "./publisher";
import type {TransactionReceipt} from "web3-core";
import {encrypt} from "./utils/crypt";
import {IUniFile, UniFile} from "./utils/uniFile";
import axios from "axios";
import {IPinServerClient, PinataSeverClientBuilder} from "./client/pinServer";
import {join} from "./utils/url";
import {INftInformationBase} from "./nftInfomation";

type InputFile = IUniFile;

export interface IUserInputForm extends INftInformationBase {
    cover: InputFile;
    content: InputFile[];
}

export interface IUploadConfig {
    cdnUrl: string;
    keyServerClientBuilder: ClientBuilder;
    pinServerClientBuilder: PinataSeverClientBuilder;
    operatorFactory: IOperatorFactory;
    account: Address;
    chain: string;
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
            metadata: IMetadata;
        }) => void
    );

    on(event: "signedRequest", callback: () => void);

    on(
        event: "coverPined" | "contentPined",
        callback: (ipfsHash: string, pinSize: number) => void
    );

    on(
        event: "metadataPined",
        callback: (ipfsHash: string, pinSize: number, metadata: IMetadata) => void
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
        receipt: {
            receipt: TransactionReceipt;
            rootNftId: string;
            metadata: IMetadata;
        }
    );

    emit(event: "signedRequest");

    emit(event: "coverPined" | "contentPined", ipfsHash: string, pinSize: number);

    emit(
        event: "metadataPined",
        ipfsHash: string,
        pinSize: number,
        metadata: IMetadata
    );
}

export interface IResumeForm {
    nftId: string;
    files: {
        cover: Uint8Array;
        contentZip: Uint8Array;
    };
    encryptedPassword: string;
    metadata: IMetadata;
}

export class UploadEventEmitter
    extends EventEmitter
    implements IUploadEventEmitter, IUploadEventEmitterEmits {
}

``

export interface IUploader {
    upload(userInputForm: IUserInputForm): {
        eventEmitter: IUploadEventEmitter;
        runUploadPromise: () => Promise<void>;
    };
}

// Use the Uploader class to complete your art publish process.
// Please see function `upload`.
export class Uploader implements IUploader {
    private readonly config: IUploadConfig;

    constructor(config: IUploadConfig) {
        this.config = config;
    }

    // Publish your art to the contract, and then pin the files to Pinata.
    // Use the returned event emitter to involve in the process.
    // Only await the returned `uploadPromise` if you have attached all listeners
    // to the event emitter.
    // Use a asynchronous workflow to attach event listeners would always fail.
    // See below to find out why.
    upload(userInputForm: IUserInputForm) {
        const eventEmitter = new UploadEventEmitter();

        return {
            eventEmitter, runUploadPromise: () => {
                return new Promise<void>((resolve, reject) => {
                    setImmediate(async () => {
                        try {
                            await this._upload(eventEmitter, userInputForm);
                        } catch (error) {
                            reject(error);
                        }
                        resolve();
                    });
                });
            }
        };
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

        // Construct metadata.

        const metadata: IMetadata = {
            name: userInputForm.name,
            description: userInputForm.description,
            image: join(config.cdnUrl, coverCid0),
            attributes: toAttributes({
                bonusPercentage: userInputForm.percentageOfEarnings,
                fileAddress: join(config.cdnUrl, contentCid0),
                filenameExtension: "zip",
                encrypted: encrypted,
            }),
            version: "1.0.0",
        };
        if (encrypted) {
            metadata.encryptMethod = "AES";
        }

        // Publish to contract.

        // This is what we call ipfsHash (In Hex, multi-hash).
        const metadataIpfasHash = await this.calculateMetadataIpfsHash(metadata);

        const nftId = await this.publishToContract(
            eventEmitter,
            {
                ...userInputForm,
                metadataIpfsHash: metadataIpfasHash,
                metadata,
            },
            config.operatorFactory.publisher
        );

        // Build key server client.

        const clientBuilder = config.keyServerClientBuilder;

        if (!clientBuilder.hasAxios()) {
            clientBuilder.axios(axios.create());
        }
        clientBuilder.sign(async (payload: string) => {
            const data = await config.sign(payload);
            eventEmitter.emit("signedRequest");
            return data;
        });

        const client = await clientBuilder.build();

        // Claim pinata key and store the passphase used to encrypt.

        const basePayload = {
            account: config.account.toString(),
            chain: config.chain,
            nft_id: nftId,
            key: password,
            // expiration: getAuthorizationExpiration(),
        } as IClaimPinataApiKeyAndStoreEncryptPasswordPayload;

        const apiKeyPair = await client.claimPinataApiKeyAndStoreEncryptPassword(
            basePayload
        );

        // Build pin server client.

        const pinServerClientBuilder = config.pinServerClientBuilder;
        if (!pinServerClientBuilder.hasApiKey()) {
            pinServerClientBuilder.axios(axios.create());
        }
        pinServerClientBuilder.apiKey(apiKeyPair.apiKey, apiKeyPair.secretApiKey);
        const pinServerClient = pinServerClientBuilder.build();

        // Pin cover, content, and metadata.

        const coverBuffer: any = {arrayBuffer: coverBinary.buffer};
        coverBuffer.name = "";

        const zipFileBuffer: any = {arrayBuffer: zipFile.buffer};
        zipFileBuffer.name = "";
        zipFileBuffer.type = "application/octet-stream";

        // This are the files that need to be uploaded.
        const files = {
            cover: new UniFile(coverBuffer),
            content: new UniFile(zipFileBuffer),
            metadata,
        };

        await this.uploadToPinService(eventEmitter, pinServerClient, files);
    }

    resume(resumeForm: IResumeForm) {
        const eventEmitter = new UploadEventEmitter();
        const resumePromise = new Promise<void>((resolve, reject) => {
            setImmediate(async () => {
                try {
                    await this._resume(eventEmitter, resumeForm);
                } catch (error) {
                    reject(error);
                }
                resolve();
            });
        });
        return {eventEmitter, uploadPromise: resumePromise};
    }

    private async _resume(
        eventEmitter: IUploadEventEmitterEmits,
        resumeForm: IResumeForm
    ) {
        const config = this.config;

        // Build key server client.

        const clientBuilder = config.keyServerClientBuilder;

        if (!clientBuilder.hasAxios()) {
            clientBuilder.axios(axios.create());
        }
        clientBuilder.sign(async (payload: string) => {
            const data = await config.sign(payload);
            eventEmitter.emit("signedRequest");
            return data;
        });

        const client = await clientBuilder.build();

        // Claim pinata key and store the passphase used to encrypt.

        const basePayload = {
            account: config.account.toString(),
            chain: config.chain,
            nft_id: resumeForm.nftId,
            key: resumeForm.encryptedPassword,
            // expiration: getAuthorizationExpiration(),
        } as IClaimPinataApiKeyAndStoreEncryptPasswordPayload;

        const apiKeyPair = await client.claimPinataApiKeyAndStoreEncryptPassword(
            basePayload
        );

        // Build pin server client.

        const pinServerClientBuilder = config.pinServerClientBuilder;
        if (!pinServerClientBuilder.hasAxios()) {
            pinServerClientBuilder.axios(axios.create());
        }
        pinServerClientBuilder.apiKey(apiKeyPair.apiKey, apiKeyPair.secretApiKey);
        const pinServerClient = pinServerClientBuilder.build();

        // Pin cover, content, and metadata.

        const coverBinary = resumeForm.files.cover;
        const coverBuffer: any = {arrayBuffer: coverBinary.buffer};
        coverBuffer.name = "";

        const zipFile = resumeForm.files.contentZip;
        const zipFileBuffer: any = {arrayBuffer: zipFile.buffer};
        zipFileBuffer.name = "";
        zipFileBuffer.type = "application/octet-stream";

        // This are the files that need to be uploaded.
        const files = {
            cover: new UniFile(coverBuffer),
            content: new UniFile(zipFileBuffer),
            metadata: resumeForm.metadata,
        };

        await this.uploadToPinService(eventEmitter, pinServerClient, files);
    }

    private async generateZip(
        eventEmitter: IUploadEventEmitterEmits,
        files: InputFile[],
        encrypted: boolean
    ) {
        eventEmitter.emit("beginGeneratingZip");
        const zip = new JSZip();
        for (const file of files) {
            const _file = await file.content("ArrayBuffer");
            zip.file(file.path, _file);
        }
        let zipFile = await zip.generateAsync(
            {
                type: "uint8array",
                compression: "DEFLATE",
                compressionOptions: {level: 5},
            },
            (metadata) =>
                eventEmitter.emit(
                    "processingZip",
                    metadata.percent,
                    metadata.currentFile
                )
        );
        eventEmitter.emit("zipGenerated", zipFile);
        let password = "NEVER_USED";
        if (encrypted) {
            const _promise = new Promise((resolve, reject) => {
                setImmediate(() => {
                    try {
                        const encryptedResult = encrypt(zipFile);
                        resolve(encryptedResult);
                    } catch (err) {
                        reject(err)
                    }
                })
            })
            const encryptedResult = await _promise as {
                encrypted: string;
                password: string;
            };
            const encrypted = encryptedResult.encrypted;
            password = encryptedResult.password;
            const textEncoder = new TextEncoder();
            zipFile = new Uint8Array(textEncoder.encode(encrypted));
            eventEmitter.emit("encrypted", zipFile);
        }
        return {zipFile, password};
    }

    private async calculateCid0(coverFile: Uint8Array, zipFile: Uint8Array) {
        const coverCid0 = await fileToIpfsCid0(coverFile);
        const zipFileCid0 = await fileToIpfsCid0(zipFile);
        return {coverCid0, zipFileCid0};
    }

    private async calculateMetadataIpfsHash(metadata: object) {
        const metadataCid0 = await plainObjectToIpfsCid0(metadata);
        const metadataMultiHash = ipfsCid0ToMultiHash(metadataCid0);
        return metadataMultiHash;
    }

    private async publishToContract(
        eventEmitter: IUploadEventEmitterEmits,
        input: IUserInputForm & { metadataIpfsHash: string; metadata: IMetadata },
        publisher: IPublisher
    ) {

        const receipt = await publisher.publish(
            new PublishForm(
                input.sellingPrice,
                input.royaltyPrice,
                input.percentageOfEarnings,
                input.maxShareTimes,
                input.metadataIpfsHash,
                !input.allowSecondaryCreation,
                input.paymentCurrency,
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
        eventEmitter.emit("published", {...receipt, metadata: input.metadata});
        return receipt.rootNftId;

    }

    private async uploadToPinService(
        eventEmitter: IUploadEventEmitterEmits,
        client: IPinServerClient,
        files: { cover: UniFile; content: UniFile; metadata: IMetadata }
    ) {
        const {ipfsHash: coverIpfsHash, pinSize: coverPinSize} =
            await client.pinFile(files.cover);
        eventEmitter.emit("coverPined", coverIpfsHash, coverPinSize);
        const {ipfsHash: contentIpfsHash, pinSize: contentPinSize} =
            await client.pinFile(files.content);
        eventEmitter.emit("contentPined", contentIpfsHash, contentPinSize);
        const {ipfsHash: metadataIpfsHash, pinSize: metadataPinSize} =
            await client.pinJson(files.metadata);
        eventEmitter.emit(
            "metadataPined",
            metadataIpfsHash,
            metadataPinSize,
            files.metadata
        );
        return {
            ipfsHash: {
                cover: coverIpfsHash,
                content: contentIpfsHash,
                metadata: metadataIpfsHash,
            },
        };
    }
}
