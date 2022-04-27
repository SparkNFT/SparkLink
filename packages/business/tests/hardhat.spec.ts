// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hardHat = require("hardhat");
import Web3 from "web3";

describe("Hardhat", function () {
  this.timeout(10 * 1000);
  it("should connect to a local network without accounts config", async function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const web3: Web3 = hardHat.web3;
    const promise = new Promise(function (resolve) {
      resolve(undefined);
    });
    await promise;
  });
});
