// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Web3InBrowser from "web3/dist/web3.min.js";
import { Address, UserOperatorFactory } from "@SparkLink/business";
import { chainIdToContractAddress } from "./chainIdToContractAddress";
import {
  chainIdToName,
  ChainTokenInquirer,
  ERC20TokenInquirer,
  IToken,
  ITokenInquirer,
  localTokenInquirerHolder,
  storageTokenInquirerHolder,
} from "../token";
import { assert } from "console";

/**
 * Chain ID to rpc server map.
 */
const rpcMap = new Map<number, string>();
rpcMap.set(4, "https://rinkeby.infura.io/v3/ae0de58ec6c347fe85a5d5434ff0a399");

const chainSet = new Set<number>();
const userOperatorFactoryMap = new Map<number, UserOperatorFactory>();
const tokenInquirerMap = new Map<number, ITokenInquirer>();

rpcMap.forEach((value, key) => {
  const provider = new Web3InBrowser.providers.HttpProvider(value);
  const web3 = new Web3InBrowser(provider);
  const contractAddress = chainIdToContractAddress.get(key) as string;
  const chainName = chainIdToName.get(key) as string;
  console.assert(contractAddress), console.assert(chainName);
  const userOperatorFactory = new UserOperatorFactory(
    web3,
    new Address("0x0000000000000000000000000000000000000000"),
    chainName,
    key,
    contractAddress
  );
  userOperatorFactoryMap.set(key, userOperatorFactory);
  chainSet.add(key);
  const tokenInquirer = $makeTokenInquirer(key);
  tokenInquirerMap.set(key, tokenInquirer);
});

function $makeTokenInquirer(chainId: number) {
  const userOperatorFactory = userOperatorFactoryMap.get(
    chainId
  ) as UserOperatorFactory;
  const inquirers = [localTokenInquirerHolder, storageTokenInquirerHolder].map(
    (holder) => holder.get(chainId) as ITokenInquirer
  );
  console.assert(inquirers.length === 2);
  inquirers.push(
    new ERC20TokenInquirer(chainId, userOperatorFactory.ERC20Contract)
  );
  return new ChainTokenInquirer(chainId, inquirers);
}

function checkChain(chainId: number) {
  if (!chainSet.has(chainId))
    throw new Error(`Chain ID ${chainId} is not supported by this service.`);
}

async function $getNftInfo(chainId: number, nftId: string) {
  const userOperatorFactory = userOperatorFactoryMap.get(
    chainId
  ) as UserOperatorFactory;
  const infoGetter = userOperatorFactory.nftInformationGetter;
  const raw = await infoGetter.get(nftId);
  return {
    ...raw,
    paymentCurrency: await $getToken(chainId, raw.paymentCurrency) as IToken,
  };
}

async function $getToken(chainId: number, tokenAddress: Address) {
  const inquirer = tokenInquirerMap.get(chainId) as ITokenInquirer;
  return await inquirer.query(tokenAddress.value);
}

export function getNftInfo(chainId: number, nftId: string) {
  checkChain(chainId);
  return $getNftInfo(chainId, nftId);
}

export function getToken(chainId: number, tokenAddress: Address) {
  checkChain(chainId);
  return $getToken(chainId, tokenAddress);
}
