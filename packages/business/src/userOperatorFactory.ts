import axios from "axios";
import type Web3 from "web3";
import Client, { ClientBuilder } from "./client/keyServer";
import { PinataSeverClientBuilder } from "./client/pinServer";
import { ContentDownloader } from "./downloader";
import { ERC20Contract } from "./ERC20Contract";
import { NftInformationGetter } from "./nftInfomation";
import { OperatorFactory } from "./operatorFactory";
import { Address } from "./types/address";
import { IUploadConfig, IUploader, Uploader } from "./uploader";

// This class is a factory class for all APIs users could reach.
// To check the docs of an API, please refer to corresponse code file.
export class UserOperatorFactory {
  private static readonly CDN_URL = "sparklink.mypinata.cloud";
  static async getChainId(web3: Web3): Promise<number> {
    return await web3.eth.getChainId();
  }

  private readonly web3: Web3;
  private readonly sender: Address;
  private readonly contractAddress: Address;

  private getSign() {
    const web3 = this.web3;
    const sender = this.sender;
    const domain = {
      chainId: this.chainId,
      name: "Ease Share",
      version: 1,
    };
    const usePersonalSign = true;
    return async (payload: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await web3.eth.personal.sign(payload, sender.value);
    };
  }
  minConfirmNum: number;
  private readonly chain: string;
  private readonly chainId: number;

  // If any value of parameters change, you should get a new factory
  // to keep the APIs performing correctly.
  constructor(
    web3: Web3,
    sender: Address | string,
    chain: string,
    chainId: number,
    contractAddress: Address | string,
    minConfirmNum = -1
  ) {
    this.web3 = web3;
    if (typeof sender === "string") sender = new Address(sender);
    this.sender = sender;
    if (typeof contractAddress === "string")
      contractAddress = new Address(contractAddress);
    this.contractAddress = contractAddress;
    this.minConfirmNum = minConfirmNum;
    this.chain = chain;
    this.chainId = chainId;
  }

  get uploader(): IUploader {
    const sign = this.getSign();
    const config = {
      cdnUrl: UserOperatorFactory.CDN_URL,
      keyServerClientBuilder: new ClientBuilder().axios(axios.create()),
      pinServerClientBuilder: new PinataSeverClientBuilder().axios(
        axios.create()
      ),
      operatorFactory: new OperatorFactory(
        this.web3,
        this.sender,
        this.contractAddress,
        this.minConfirmNum
      ),
      account: this.sender,
      chain: this.chain,
      sign,
    } as IUploadConfig;

    return new Uploader(config);
  }

  get nftInformationGetter() {
    return new NftInformationGetter(
      axios.create(),
      this.web3,
      this.contractAddress,
      UserOperatorFactory.CDN_URL
    );
  }

  get keyServerClient() {
    return new Client(axios.create(), this.getSign());
  }

  async getContentDownloader(
    encrypted: boolean,
    nftId: string,
    password?: string
  ) {
    if (!password && encrypted) {
      const client = this.keyServerClient;
      password = await client.retrieveEncryptPassword({
        account: this.sender.value,
        chain: this.chain,
        nft_id: nftId,
        //expiration: getAuthorizationExpiration(),
      });
    }
    return new ContentDownloader(axios.create(), encrypted, password);
  }

  get shop() {
    const factory = new OperatorFactory(
      this.web3,
      this.sender,
      this.contractAddress,
      this.minConfirmNum
    );
    return factory.shop;
  }

  get ERC20Contract() {
    return new ERC20Contract(this.web3);
  }
}
