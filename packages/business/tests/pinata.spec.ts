import axios from "axios";
import { expect } from "chai";
import { PinataSeverClientBuilder } from "../src/client/pinServer";
import { plainObjectToIpfsCid0 } from "../src/utils/toIpfsCid0";
import { UniFile } from "../src/utils/uniFile";
import { config } from "./configs";

describe("pinata", function () {
  const fakeObject = {
    a: 1,
    b: "hello",
    c: {
      a: "world",
      b: ["1", "2"],
    },
  };
  const encoder = new TextEncoder();
  const fakeFile = new UniFile({
    arrayBuffer: encoder.encode(JSON.stringify(fakeObject)).buffer,
    name: "",
    type: "",
  });
  let client;
  this.beforeEach(function () {
    if (!config.execute.pinata) this.skip();
    client = new PinataSeverClientBuilder()
      .axios(axios.create())
      .apiKey(config.execute.pinata.apiKey, config.execute.pinata.apiSecret)
      .build();
  });
  this.timeout(20 * 1000);
  it("pin the same contetn file and json should get same ipfsHash", async function () {
    const result1 = await client.pinFile(fakeFile);
    const result2 = await client.pinJson(fakeObject);
    expect(result1.ipfsHash).to.equal(result2.ipfsHash);
    const result3 = await plainObjectToIpfsCid0(fakeObject);
    expect(result1.ipfsHash).to.equal(result3);
  });
});
