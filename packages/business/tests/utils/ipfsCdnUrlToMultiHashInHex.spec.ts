import { expect } from "chai";
import { ipfsCdnUrlToMultiHashInHex } from "../../src/utils/ipfsCdnUrlToMultiHashInHex";

describe("function ipfsCdnUrlToMultiHashInHex", function () {
  it("should parse a ipfs file url into a multi-hash in hex.", function () {
    const result = ipfsCdnUrlToMultiHashInHex(
      "https://ipfs.io/ipfs/Qmay14WNgbBwbrv9XVsN5xzNFYL7CpfsuQ1z77Xz4C3zfB"
    );
    expect(result).to.equal(
      "0x1220bb9c29fd6780efc2a01d8c91de95fb73b9033ed46ed538535ef1b086c4260fca"
    );
  });
});
