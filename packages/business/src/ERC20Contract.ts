// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ERC20ABI from "erc-20-abi";
import type Web3 from "web3";
import { Address } from "./types/address";
import { Contract } from "./types/contract";

export interface IERC20Contract {
  symbol(address: Address): Promise<string>;
}

export class ERC20Contract implements IERC20Contract {
  private contract: Contract;

  constructor(web3: Web3) {
    this.contract = new web3.eth.Contract(ERC20ABI);
  }

  async symbol(address: Address): Promise<string> {
    this.contract.options.address = address.value;
    return await this.contract.methods.symbol().call();
  }
}
