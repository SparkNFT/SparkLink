import {
  IUploadConfig,
  IUploader,
  IUploadEventEmitter,
  IUserInputForm,
  Uploader,
} from "../src/uploader";
import axios from "axios";
import { IOperatorFactory, OperatorFactory } from "../src/operatorFactory";
import { config, config as testConfig } from "./configs";
import { Address } from "../src/types/address";
import { UniFile } from "../src/utils/uniFile";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import sinon from "sinon";
import { expect } from "chai";
import { TransactionReceipt } from "web3-core";
import { PinataSeverClientBuilder } from "../src/client/pinServer";
import { ipfsCdnUrlToMultiHashInHex } from "../src/utils/ipfsCdnUrlToMultiHashInHex";
import { ipfsCid0ToMultiHash } from "../src/utils/ipfsCid0ToMultiHash";
import {
  getEncryptedContent,
  NftInformationGetter,
} from "../src/nftInfomation";
import { decrypt } from "../src/utils/crypt";
import { newBuilder } from "./stubs/keyServerClient.stub";
import { newBuilder as newPinServerClientBuilder } from "./stubs/pinServerClient.stub";
import { BuyEventEmitter } from "../src/shop";

describe("The put and get nft process", function () {
  context("In normal process", function () {
    let operatorFactory: IOperatorFactory;
    let testUsageNftId: string,
      userInputForm: IUserInputForm,
      encryptedZip: Uint8Array,
      zipfile: Uint8Array;
    let _getClient;
    const fakechain = "ethernet";
    context("when upload", function () {
      let uploader: Uploader, config: IUploadConfig;
      let assertKeyServerClientCall: () => void;
      let assertPinServerClientCall: () => void;

      before(async function () {
        const { clientBuilder, getStubs, getClient } = newBuilder({
          claimAndStoreExpection() {
            return;
          },
          retrieveNftIdsExpection() {
            return;
          },
          retrieveEncryptPasswordException() {
            return;
          },
        });

        _getClient = getClient;

        assertKeyServerClientCall = () => {
          const stubs = getStubs();
          expect(stubs.claimAndStoreStub.callCount).to.equal(1);
          expect(stubs.retrieveNftIdsStub.callCount).to.equal(0);
          expect(stubs.retrieveEncryptPasswordStub.callCount).to.equal(0);
        };

        const {
          clientBuilder: pinServerClientBuilder,
          getStub: getPinServerClientStub,
          getClient: getPinServerClient,
        } = newPinServerClientBuilder({
          pinFileExpection() {
            return;
          },
          pinJsonExpection() {
            return;
          },
        });

        assertPinServerClientCall = function () {
          const { pinFileStub, pinJsonStub } = getPinServerClientStub();
          expect(pinFileStub.callCount).to.equal(2);
          expect(pinJsonStub.callCount).to.equal(1);
        };

        operatorFactory = new OperatorFactory(
          testConfig.web3,
          new Address(testConfig.senderAddress),
          new Address(testConfig.contractAddress),
          2
        );
        await operatorFactory.init();

        config = {
          cdnUrl: "https://ipfs.io/ipfs",
          keyServerClientBuilder: clientBuilder,
          operatorFactory: operatorFactory,
          pinServerClientBuilder: pinServerClientBuilder,
          account: new Address(testConfig.senderAddress),
          chain: fakechain,
          sign: async (payloadStr) => {
            return await testConfig.web3.eth.sign(
              payloadStr,
              testConfig.senderAddress
            );
          },
        } as IUploadConfig;

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
          royaltyPrice: 10000n,
          sellingPrice: 1145141919810n,
          maxShareTimes: 64,
          allowSecondaryCreation: false,
          encrypted: true,
          description: "homo demo",
          cover,
          content,
        };
        uploader = new Uploader(config);
      });
      it("should emit events correctly.", async function () {
        this.timeout(15 * 1000);
        const { eventEmitter: _eventEmitter, runUploadPromise } =
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
          metadataPined: 0,
        };
        const beginGeneratingZipCallback = sinon.stub();
        beginGeneratingZipCallback.callsFake(() => {
          eventMap.beginGeneratingZip++;
        });
        eventEmitter.on("beginGeneratingZip", beginGeneratingZipCallback);
        const processingZipCallback = sinon.stub();
        processingZipCallback.callsFake((percent: number, file: string) => {
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
        publishedCallback.callsFake(
          (receipt: { receipt: TransactionReceipt; rootNftId: string }) => {
            expect(eventMap.publishConfirmation).to.equal(3);
            const transactionReceipt = receipt.receipt;
            const _rootNftId = receipt.rootNftId;
            expect(transactionReceipt).to.be.an("object");
            expect(_rootNftId).to.equal(rootNftId);
            eventMap.published++;
          }
        );
        eventEmitter.on("published", publishedCallback);
        const signedRequest = sinon.stub();
        signedRequest.callsFake(() => {
          expect(eventMap.published).to.equal(1);
          eventMap.signedKeyClaimPayload++;
        });
        eventEmitter.on("signedRequest", signedRequest);

        eventEmitter.on("coverPined", (_ipfsHash, pinSize) => {
          expect(eventMap.signedKeyClaimPayload).to.equal(1);
          eventMap.coverPined++;
        });
        eventEmitter.on("contentPined", (_ipfsHash, pinSize) => {
          expect(eventMap.coverPined).to.equal(1);
          eventMap.contentPined++;
        });
        eventEmitter.on("metadataPined", (_, __, metadataPined) => {
          expect(eventMap.contentPined).to.equal(1);
          eventMap.metadataPined++;
        });
        await runUploadPromise();
        expect(eventMap.metadataPined).to.equal(1);
        assertKeyServerClientCall();
        assertPinServerClientCall();
        testUsageNftId = rootNftId;
      });
      it("should upload file correctly.", async function () {
        this.timeout(60 * 1000);
        if (!testConfig.execute.pinata) this.skip();
        const localConfig: IUploadConfig = { ...config };
        localConfig.pinServerClientBuilder =
          new PinataSeverClientBuilder().axios(axios.create());
        const uploader: IUploader = new Uploader(localConfig);
        const { eventEmitter, runUploadPromise } =
          uploader.upload(userInputForm);
        let coverIpfsHash, contentIpfsHash;
        eventEmitter.on("zipGenerated", (file) => {
          zipfile = file;
        });
        eventEmitter.on("publishConfirmation", (_, r) => {
          testUsageNftId = r;
        });
        eventEmitter.on("encrypted", (content) => {
          encryptedZip = content;
        });
        eventEmitter.on("coverPined", (ipfsHash) => {
          coverIpfsHash = ipfsCid0ToMultiHash(ipfsHash);
        });
        eventEmitter.on("contentPined", (ipfsHash) => {
          contentIpfsHash = ipfsCid0ToMultiHash(ipfsHash);
        });
        eventEmitter.on("metadataPined", (_, __, metadata) => {
          const _coverHash = ipfsCdnUrlToMultiHashInHex(metadata.image);
          expect(_coverHash).to.equal(coverIpfsHash);
          const _contentHash = ipfsCdnUrlToMultiHashInHex(
            metadata.attributes[1].value as string
          );
          expect(_contentHash).to.equal(contentIpfsHash);
          return;
        });
        await runUploadPromise();
      });
    });
    context("when retrieve NFT information", function () {
      it("should retrieve correct data", async function () {
        if (!testConfig.execute.pinata) this.skip();
        const nftInformationGetter = new NftInformationGetter(
          axios.create(),
          testConfig.web3,
          testConfig.contractAddress,
          "https://cloudflare-ipfs.com/ipfs"
        );
        this.timeout(100 * 1000);
        const result = await nftInformationGetter.get(testUsageNftId);
        expect(result.name).to.be.equal(userInputForm.name);
        expect(result.description).to.be.equal(userInputForm.description);
        expect(result.paymentCurrency.value).to.be.equal(
          userInputForm.paymentCurrency.value
        );
        expect(result.owner.value).to.be.equal(config.senderAddress);
        expect(result.allowSecondaryCreation).to.be.equal(
          userInputForm.allowSecondaryCreation
        );
        expect(result.encrypted).to.be.equal(userInputForm.encrypted);
        expect(result.maxShareTimes).to.be.equal(userInputForm.maxShareTimes);
        expect(result.percentageOfEarnings).to.be.equal(
          userInputForm.percentageOfEarnings
        );
        expect(result.sellingPrice).to.be.equal(userInputForm.sellingPrice);
        expect(result.royaltyPrice).to.be.equal(userInputForm.royaltyPrice);
        const urls = result.urls;
        const cover = (
          await axios.get(urls.cover, { responseType: "arraybuffer" })
        ).data;
        const content = await getEncryptedContent(axios, urls.content);
        expect(cover).to.deep.equal(
          await userInputForm.cover.content("Uint8Array")
        );
        expect(content).to.deep.equal(encryptedZip);
        const password = await _getClient().retrieveEncryptPassword({
          account: config.senderAddress,
          chain: fakechain,
          nft_id: testUsageNftId,
          expiration: 0,
        });
        const zip = decrypt(new TextDecoder().decode(content), password);
        expect(zip).to.be.deep.equal(zipfile);
        return;
      });
    });
    context("web buy a child node", function () {
      it("should get a new nft id", async function () {
        this.timeout(120 * 1000);
        const shop = operatorFactory.shop;
        const { nftId } = await shop.buy(testUsageNftId, new BuyEventEmitter());
        expect(BigInt(nftId) - 1n).to.be.equal(BigInt(testUsageNftId));
      });
    });
  });
});
