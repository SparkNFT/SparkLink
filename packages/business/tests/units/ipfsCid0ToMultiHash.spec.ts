import { ipfsCid0ToMultiHash } from "../../src/utils/ipfsCid0ToMultiHash";
import { expect } from "chai";

describe("function ipfsCid0ToMultiHash", function () {
  it("should parse a version 0 IPFS CID into a multi-hash in hex.", function () {
    const multiHash = ipfsCid0ToMultiHash(
      "QmYMhcTZLmpHtPDsyWaRPM6waAHmfKShLbyGBjWtiMv2YX"
    );
    expect(multiHash).to.equal(
      "0x122094d9bb696f52d1998d1337c1db9908fa29817261c1ab4c2c3533e580ac67f3b0"
    );
  });
});