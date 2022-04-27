import axios, { Axios } from "axios";
import type Web3 from "web3";
import ContractAbi from "./abi";
import { fromAttributes, IMetadata_1_0_0 } from "./metadata/metadata.1.0.0";
import { Address } from "./types/address";
import { Contract } from "./types/contract";
import { ipfsCdnUrlExchange } from "./utils/ipfsCdnUrlExchange";

export interface INftInformationBase {
  name: string;
  percentageOfEarnings: number;
  paymentCurrency: Address;
  // In wei.
  sellingPrice: bigint;
  royaltyPrice: bigint;
  maxShareTimes: number;
  allowSecondaryCreation: boolean;
  encrypted: boolean;
  description: string;
}

export interface INftInformation extends INftInformationBase {
  // In wei, too. Currency in this project is always in wei.
  profit: bigint;
  remainShareTimes: number;
  owner: Address;
  urls: {
    cover: string;
    content: string;
  };
}

// Get the information about a nft. You don't need any authorization to complete a get workflow.
export class NftInformationGetter {
  private web3: Web3;
  private axios: Axios;
  private contract: Contract;
  private cdnUrl: string;

  constructor(
    axios: Axios,
    web3: Web3,
    contractAddress: Address | string,
    cdnUrl: string
  ) {
    this.web3 = web3;
    if (typeof contractAddress === "string")
      contractAddress = new Address(contractAddress);
    this.contract = new web3.eth.Contract(ContractAbi, contractAddress.value);
    this.cdnUrl = cdnUrl;
  }

  async get(nftId: string) {
    const nftIdInBigInt = BigInt(nftId);
    const getNftInfoByNftIdPromise = this.contract.methods
      .getNFTInfoByNFTID(nftIdInBigInt)
      .call();
    const getTokenAddrByNFTIdPromise = this.contract.methods
      .getTokenAddrByNFTId(nftIdInBigInt)
      .call();
    const getOwnerPromise = this.contract.methods.ownerOf(nftIdInBigInt).call();
    const getRoyaltyPriceByNFTIdPromise = this.contract.methods
      .getRoyaltyPriceByNFTId(nftIdInBigInt)
      .call();
    const [nftInfo, tokenAddr, owner, royaltyPrice] = await Promise.all([
      getNftInfoByNftIdPromise,
      getTokenAddrByNFTIdPromise,
      getOwnerPromise,
      getRoyaltyPriceByNFTIdPromise,
    ]);
    const metadataUrl = ipfsCdnUrlExchange(nftInfo.metadata, this.cdnUrl);
    const metadata = await this.getMetadata(metadataUrl);
    const issueInformationBinary = BigInt(nftInfo.issue_information);
    const issueInfo = getIssueInfo(issueInformationBinary);
    return {
      ...metadata,
      profit: nftInfo.profit,
      remainShareTimes: nftInfo.remain_shill_times,
      paymentCurrency: new Address(tokenAddr),
      owner: new Address(owner),
      sellingPrice: BigInt(nftInfo.shill_price),
      maxShareTimes: issueInfo.shareTimes,
      allowSecondaryCreation: !issueInfo.isND,
      royaltyPrice: BigInt(royaltyPrice),
    } as INftInformation;
  }

  private async getMetadata(url) {
    const data = (await axios.get(url)).data;
    const version = data.version;
    if (version === "1.0.0") {
      return await this.getMetadata_1_0_0(data);
    } else {
      throw new Error("Metadata version not found.");
    }
  }

  private async getMetadata_1_0_0(data: IMetadata_1_0_0) {
    const attributesForm = fromAttributes(data.attributes);
    return {
      name: data.name,
      description: data.description,
      percentageOfEarnings: attributesForm.bonusPercentage,
      encrypted: attributesForm.encrypted,
      urls: {
        cover: ipfsCdnUrlExchange(data.image, this.cdnUrl),
        content: ipfsCdnUrlExchange(attributesForm.fileAddress, this.cdnUrl),
      },
    } as INftInformation;
  }
}

const _8BitMask = (1n << 8n) - 1n;
const _16BitMask = (1n << 16n) - 1n;
const _31BitMask = (1n << 31n) - 1n;

interface IIssueInfo {
  totalAmount: bigint;
  isND: boolean;
  shareTimes: number;
  royaltyFee: number;
}

// An `issueInformation` is a uint64 record in the contract which records some important information.
export function getIssueInfo(issueInformation: bigint): IIssueInfo {
  const totalAmount = issueInformation & _31BitMask;
  issueInformation >>= 39n;
  const isND = !!(issueInformation & 1n);
  issueInformation >>= 1n;
  const shareTimes = Number(issueInformation & _16BitMask);
  issueInformation >>= 16n;
  const royaltyFee = Number(issueInformation);
  return {
    totalAmount,
    isND,
    shareTimes,
    royaltyFee,
  } as IIssueInfo;
}

export async function getEncryptedContent(
  axios: Axios,
  contentUrl: string
): Promise<Uint8Array> {
  return (await axios.get(contentUrl, { responseType: "arraybuffer" })).data;
}
