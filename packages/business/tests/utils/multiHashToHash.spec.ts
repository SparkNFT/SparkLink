import { multiHashToHash } from "../../src/utils/multiHashToHash";
import { expect } from "chai";

describe("function multiHashToHash", function () {
  it("should parse a sha-256 multi-hash in hex into a sha-256 hash.", function () {
    const hash = multiHashToHash(
      "0x122094d9bb696f52d1998d1337c1db9908fa29817261c1ab4c2c3533e580ac67f3b0"
    );
    expect(hash).to.have.a.lengthOf(66);
    expect(hash).to.equal(
      "0x94d9bb696f52d1998d1337c1db9908fa29817261c1ab4c2c3533e580ac67f3b0"
    );
  });
});
