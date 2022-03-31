import { Contract as Web3Contract } from "web3-eth-contract";

export type Contract = Web3Contract;

export function validateWritableContract(contract: Contract) {
  if (!contract.options.address)
      throw new Error("Contract Address should be specified.");
    else if (!contract.options["from"])
      throw new Error("Contract should have a sender address.");
}