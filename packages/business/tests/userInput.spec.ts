import {
	IUploadConfig,
	IUploadEventEmitter,
	IUserInputForm,
	Uploader,
} from "../src/userInput";
import Client, {IBasePayload, IClaimPinataApiKeyPayload, IKeyServerClient} from "../src/client/keyserver";
import axios from "axios";
import {OperatorFactory} from "../src/operatorFactory";
import {config, config as testConfig} from "./config";
import {Address} from "../src/types/address";
import {UniFile} from "../src/utils/uniFile";
import {readFile} from "fs/promises";
import {join} from "path";
import sinon from "sinon";
import {expect} from "chai";
import {TransactionReceipt} from "web3-core";
import Web3 from "web3";

describe("Uploader", function () {
	let uploader: Uploader, userInputForm: IUserInputForm, client: IKeyServerClient;
	before(async function () {
		client = new Client(
			axios.create({baseURL: "https://fake.site.com"})
		);
		const config = {
			cdnUrl: "https://ipfs.io/ipfs",
			keyServerClient: new Client(
				axios.create({baseURL: "https://fake.site.com"})
			),
			operatorFactory: new OperatorFactory(
				testConfig.web3,
				new Address(testConfig.senderAddress),
				new Address(testConfig.contractAddress),
				2
			),
			account: new Address(testConfig.senderAddress),
			chainId: 137,
			sign: async (payloadStr) => {
				return await testConfig.web3.eth.sign(
					payloadStr,
					testConfig.senderAddress
				);
			},
		};

		const assetsPath = join(__dirname, "assets");
		const coverFileName = "cover.png";
		const cover = new UniFile({
			buffer: await readFile(join(assetsPath, coverFileName)),
			name: coverFileName,
			path: coverFileName,
			type: "",
		});
		const helloFileName = "hello.txt";
		const worldFileName = "world.txt";
		const content = [
			new UniFile({
				buffer: await readFile(join(assetsPath, helloFileName)),
				name: helloFileName,
				path: helloFileName,
				type: "",
			}),
			new UniFile({
				buffer: await readFile(join(assetsPath, worldFileName)),
				name: worldFileName,
				path: worldFileName,
				type: "",
			}),
		];
		userInputForm = {
			name: "demo",
			percentageOfEarnings: 25,
			paymentCurrency: new Address(
				"0x0000000000000000000000000000000000000000"
			),
			sellingPrice: 1145141919810n,
			maxShareTimes: 64,
			allowSecondaryCreation: true,
			allowCommercialUsage: true,
			freeForSecondLevel: false,
			encrypted: true,
			description: "homo demo",
			cover,
			content,
		};
		uploader = new Uploader(config);
	});
	context("when upload", function () {
		it("should emit events correctly.", async function () {
			this.timeout(15 * 1000);
			const {eventEmitter: _eventEmitter, uploadPromise} =
				uploader.upload(userInputForm);
			const eventEmitter = _eventEmitter as IUploadEventEmitter;
			const eventMap = {
				beginGeneratingZip: 0,
				processingZip: 0,
				zipGenerated: 0,
				encrypted: 0,
				publishConfirmation: 0,
				published: 0,
				signedKeyClaimPayload: 0,
				coverPined: 0,
				contentPined: 0,
				metadataPined: 0
			};
			const beginGeneratingZipCallback = sinon.stub();
			beginGeneratingZipCallback.callsFake(() => {
				eventMap.beginGeneratingZip++;
			});
			eventEmitter.on("beginGeneratingZip", beginGeneratingZipCallback);
			const processingZipCallback = sinon.stub();
			processingZipCallback.callsFake((percent: number, file: string) => {
				console.log(percent, file);
				expect(eventMap.beginGeneratingZip).to.equal(1);
				try {
					expect(file).to.match(/(hello\.txt)|(world\.txt)/);
				} catch (ignored) {
					expect(percent).to.equal(100);
				}
				eventMap.processingZip++;
			});
			eventEmitter.on("processingZip", processingZipCallback);
			let zipBeforeEncrypt: Uint8Array;
			const zipGeneratedCallback = sinon.stub();
			zipGeneratedCallback.callsFake((content: Uint8Array) => {
				expect(eventMap.processingZip).to.be.gte(1);
				expect(content).to.be.an.instanceof(Uint8Array);
				zipBeforeEncrypt = content;
				eventMap.zipGenerated++;
			});
			eventEmitter.on("zipGenerated", zipGeneratedCallback);
			let zipAfterEncrypt;
			const encryptedCallback = sinon.stub();
			encryptedCallback.callsFake((encryptedContent: Uint8Array) => {
				expect(eventMap.zipGenerated).to.equal(1);
				expect(encryptedContent).to.be.an.instanceof(Uint8Array);
				zipAfterEncrypt = encryptedContent;
				eventMap.encrypted++;
			});
			eventEmitter.on("encrypted", encryptedCallback);
			let rootNftId: string;
			const publishConfirmationCallback = sinon.stub();
			publishConfirmationCallback.callsFake(
				(
					confNumber: number,
					_rootNftId: string,
					receipt: TransactionReceipt,
					latestBlockHash?: string
				) => {
					expect(eventMap.zipGenerated).to.equal(1);
					expect(confNumber).to.equal(eventMap.publishConfirmation);
					if (!rootNftId) rootNftId = _rootNftId;
					else expect(_rootNftId).to.equal(rootNftId);
					expect(receipt).to.be.an("object");
					expect(!!latestBlockHash).to.be.true;
					eventMap.publishConfirmation++;
				}
			);
			eventEmitter.on("publishConfirmation", publishConfirmationCallback);
			const publishedCallback = sinon.stub();
			publishedCallback.callsFake((receipt: { receipt: TransactionReceipt; rootNftId: string }) => {
				expect(eventMap.publishConfirmation).to.equal(3);
				const transactionReceipt = receipt.receipt;
				const _rootNftId = receipt.rootNftId;
				expect(transactionReceipt).to.be.an("object");
				expect(_rootNftId).to.equal(rootNftId);
			})
			eventEmitter.on("published", publishedCallback);
			const signedKeyClaimPayload = sinon.stub();

			function assertBasePayload(basePayload: IBasePayload, expectNftId: string) {
				expect(basePayload).to.have.a.property("account", testConfig.senderAddress);
				expect(basePayload).to.have.a.property("chainId", 137);
				expect(basePayload).to.have.a.property("nft_id");
				expect(basePayload.nft_id).to.equal(expectNftId);
			}

			async function assertSignatrue(payload: object, signature: string) {
				const str = JSON.stringify(payload);
				expect(await config.web3.eth.sign(str, config.senderAddress)).to.equal(signature);
			}

			signedKeyClaimPayload.callsFake((payload: IClaimPinataApiKeyPayload) => {
				expect(eventMap.published).to.equal(1);
				assertBasePayload(payload.payload, rootNftId);
				eventMap.signedKeyClaimPayload++;
			})
			eventEmitter.on("signedKeyClaimPayload", signedKeyClaimPayload);
			sinon.stub(client, "claimPinataApiKey").callsFake(async (payload: IClaimPinataApiKeyPayload) => {
				const basePayload = payload.payload;
				const signature = payload.signature;
				assertBasePayload(basePayload, rootNftId);
				await assertSignatrue(basePayload, signature);
				return {apiKey: "fake_api_key", secretAPIKey: "fake_secret_api_key"}
			})

			await uploadPromise;
		});
	});
});


