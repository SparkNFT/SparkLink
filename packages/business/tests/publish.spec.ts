import { config } from "./config";
import { OperatorFactory } from "../src/operatorFactory";
import { IPublisher, IPublishForm, PublishForm } from "../src/publish";
import { base58_to_binary } from "base58-js";
import { expect } from "chai";

describe("Publisher", function () {
  this.timeout(15 * 1000);
  context("when publish", function () {
    beforeEach(function () {
      const factory = new OperatorFactory(
        config.web3,
        config.senderAddress,
        config.contractAddress
      );
      this.publisher = factory.publisher;
      this.demoForm = new PublishForm(
        10000n,
        20,
        256,
        "0x122064EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C",
        false,
        false,
        false
      );
    });
    it("should send a right transaction to the contract", async function () {
      const publisher = this.publisher as IPublisher;
      const demoForm = this.demoForm as IPublishForm;
      const { receipt, rootNftId } = await publisher.publish(demoForm, 2);

      // Assert that the receipt is a correct transaction receipt.

      expect(receipt).to.have.a.property("transactionHash");
      expect(receipt).to.have.a.property(
        "from",
        config.senderAddress.toLocaleLowerCase()
      );
      expect(receipt).to.have.a.property(
        "to",
        config.contractAddress.toLocaleLowerCase()
      );
      expect(receipt).to.have.a.property("status", true);
      expect(receipt).to.have.nested.property("events.Transfer");
      expect(receipt).to.have.nested.property("events.Publish");

      // Assert that the Publish event has a correct return value.

      const publishEventValue = receipt.events.Publish.returnValues;
      expect(publishEventValue).to.have.a.property(
        "publisher",
        config.senderAddress
      );
      expect(publishEventValue).to.have.a.property("rootNFTId", rootNftId);
      expect(publishEventValue).to.have.a.property(
        "token_addr",
        "0x0000000000000000000000000000000000000000"
      );

      // Assert that the rootNftId should be a bigint which is represented by string.

      expect(rootNftId).to.be.a("string");
      expect(() => BigInt(rootNftId)).not.to.throw();

      // Assert that the information of the nft has been written into the contract's state.

      const nftInformation = await config.contract.methods
        .getNFTInfoByNFTID(rootNftId)
        .call();
      expect(nftInformation).to.have.a.property(
        "shill_price",
        demoForm.sellPrice.toString()
      );
      expect(nftInformation).to.have.a.property(
        "remain_shill_times",
        demoForm.maxShareTimes.toString()
      );
      const metadata = nftInformation.metadata as string;
      const metadataArr = metadata.split(/\//);
      const base58 = metadataArr[metadataArr.length - 1];
      const binary = base58_to_binary(base58);
      const ipfsInHexFromInformation = config.web3.utils.bytesToHex(binary);
      expect(ipfsInHexFromInformation).to.equal(
        demoForm.ipfsHash.toLowerCase()
      );
    });
    it("should resolve when the confirmation number reaches the min confirmation number.", async function () {
      const publisher = this.publisher as IPublisher;
      const demoForm = this.demoForm as IPublishForm;
      publisher.minConfirmNum = 2;

      async function assertCounter(minConfirmNum, minConfirmNumFuncInput) {
        let count = 0;
        await publisher.publish(demoForm, minConfirmNumFuncInput, (confNumber) => {
          count = confNumber;
        });
        expect(count).to.equal(minConfirmNum);
      }

      await assertCounter(2, undefined);
      await assertCounter(4, 4);
    });
  });
});
