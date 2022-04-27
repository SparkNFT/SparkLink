import { PinataServerClient } from "../../src/client/pinServer";
import { UniFile } from "../../src/utils/uniFile";
import { config } from "../configs";
import { readFile } from "fs/promises";
import { expect } from "chai";
import axios from "axios";

describe("The PinataSeverClient", function () {
  let client: PinataServerClient;
  this.timeout(10 * 1000);
  before(function () {
    if (!config.execute.pinata) {
      this.skip();
    }
    const pinataConfig = config.execute.pinata;
    client = new PinataServerClient(
      axios.create(),
      pinataConfig.apiKey,
      pinataConfig.apiSecret
    );
  });
  it("should pin file currectly", async function () {
    const helloFile = new UniFile({
      buffer: await readFile(config.assetsPaths.hello),
      name: "",
      path: "",
      type: "",
    });
    const { ipfsHash, pinSize } = await client.pinFile(helloFile);
    expect(ipfsHash).to.equal("QmTu2jnNnTvK4fpUtQegcMzskiR6cZux2eQ79uyfCpvpLC");
    expect(pinSize).to.equal(488132);
  });
  it("should pin json currectly", async function () {
    const { ipfsHash, pinSize } = await client.pinJson({
      value: "hello world!",
    });
    expect(ipfsHash).to.equal("QmQQZ82ibK3CcViDnfzh9KYRGxNtZoaDSzk7V6eU8JKPaB");
    expect(pinSize).to.equal(32);
    return;
  });
});
