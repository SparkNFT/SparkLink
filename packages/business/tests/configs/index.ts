// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import hardHat = require("hardhat");
import Web3 from "web3";
import ContractAbi from "../../src/abi";
import { Contract } from "web3-eth-contract";
import pinataConfig from "./pinata";
import { join } from "path";

export let config = {} as {
  contractAddress?: string;
  senderAddress?: string;
  web3?: Web3;
  contract?: Contract;
  assetsDir?: string;
  assetsPaths: {
    hello?: string;
    world?: string;
  };
  execute: {
    pinata?: {
      apiKey: string;
      apiSecret: string;
    };
  };
};

export default async function () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const web3: Web3 = hardHat.web3;
  const accounts = await web3.eth.getAccounts();
  const contractAddress = web3.utils.toChecksumAddress(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  const assetsDir = join(__dirname, "../assets");

  config = {
    contractAddress: contractAddress,
    senderAddress: accounts[1],
    web3: web3,
    contract: new web3.eth.Contract(ContractAbi, contractAddress),
    assetsDir: assetsDir,
    assetsPaths: {
      hello: join(assetsDir, "hello.txt"),
      world: join(assetsDir, "world.txt"),
    },
    execute: {},
  };

  if (process.env.PINATA_TEST === "true") {
    config.execute.pinata = pinataConfig;
  }
}
