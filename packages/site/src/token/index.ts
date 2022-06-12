/* eslint-disable @typescript-eslint/ban-ts-comment */
import ethTokenInfo from "./eth.json";
import bscTokenInfo from "./bsc.json";
import maticTokenInfo from "./matic.json";
import rinkebyInfo from "./rinkeby.json";
import { Address, IERC20Contract } from "@SparkLink/business";

export const chainIdToName = new Map<number, string>();
// chainIdToName.set(1, "ethereum");
chainIdToName.set(4, "rinkeby");
chainIdToName.set(56, "bsc");
chainIdToName.set(137, "matic");

export interface IToken {
  address: string;
  symbol: string;
  logoURI: string;
}

export const tokens = {
  ethereum: ethTokenInfo.tokens as IToken[],
  bsc: bscTokenInfo.tokens as IToken[],
  matic: maticTokenInfo.tokens as IToken[],
  rinkeby: rinkebyInfo.tokens as IToken[],
};

export function chainIdToTokenArr(chainId: number): IToken[] {
  if (!chainIdToName.has(chainId))
    throw new Error(`Chain ID ${chainId} is not supported.`);
  // @ts-ignore
  return tokens[chainIdToName.get(chainId) as string];
}

function produceSymbolsToTokensMap(tokenArr: IToken[]): Map<string, IToken> {
  return tokenArr.reduce((map, obj) => {
    map.set(obj.symbol, obj);
    return map;
  }, new Map<string, IToken>());
}

const symbolsToTokensMaps = {
  ethereum: produceSymbolsToTokensMap(tokens.ethereum),
  bsc: produceSymbolsToTokensMap(tokens.bsc),
  matic: produceSymbolsToTokensMap(tokens.matic),
  rinkeby: produceSymbolsToTokensMap(tokens.rinkeby),
};

function produceTokenAddressesToSymbolsMap(
  tokenArr: IToken[]
): Map<string, string> {
  return tokenArr.reduce((map, obj) => {
    map.set(obj.address, obj.symbol);
    return map;
  }, new Map<string, string>());
}

const tokenAddressesToSymbolsMaps = {
  ethereum: produceTokenAddressesToSymbolsMap(tokens.ethereum),
  bsc: produceTokenAddressesToSymbolsMap(tokens.bsc),
  matic: produceTokenAddressesToSymbolsMap(tokens.matic),
  rinkeby: produceTokenAddressesToSymbolsMap(tokens.rinkeby),
};

export function getToken(chainId: number, symbol: string) {
  const name = chainIdToName.get(chainId) as string;
  // @ts-ignore
  const symbolsToTokensMap = symbolsToTokensMaps[name] as
    | Map<string, IToken>
    | undefined;
  if (!symbolsToTokensMap)
    throw new Error(`Chain ID ${chainId} is not supported.`);
  return symbolsToTokensMap.get(symbol);
}

export function getSymbol(chainId: number, tokenAddress: string) {
  const name = chainIdToName.get(chainId) as string;
  // @ts-ignore
  const tokenAddressesToSymbolsMap = tokenAddressesToSymbolsMaps[name] as
    | Map<string, string>
    | undefined;
  if (!tokenAddressesToSymbolsMap)
    throw new Error(`Chain ID ${chainId} is not supported.`);
  return tokenAddressesToSymbolsMap.get(tokenAddress);
}

export function getLogoUrl(chainId: number, symbol: string) {
  const token = getToken(chainId, symbol);
  console.log(token);
  return token?.logoURI;
}

// Query the token entity through contract address or symbol. return undefined when the token can't be queried
// by current inquirer.
export interface ITokenInquirer {
  readonly chainId: number;
  query(address: string): Promise<IToken | undefined>;
  query(symbol: string): Promise<IToken | undefined>;
}

// Query the entire token entities array that a token inquirer can handle.
// A token inqurier can implement this interface but is not mandatory.
export interface ITokenArrInquirer {
  tokenArr(): IToken[];
}

export function isSymbol(symbolOrAddress: string) {
  return !(
    symbolOrAddress.toLocaleLowerCase().startsWith("0x") &&
    symbolOrAddress.toLocaleLowerCase().length == 42
  );
}

class TokenInquirerBase implements ITokenInquirer, ITokenArrInquirer {
  readonly chainId: number;
  protected readonly tokens: IToken[];
  protected readonly addressMap: Map<string, IToken>;
  protected readonly symbolMap: Map<string, IToken>;

  protected constructor(chainId: number, tokensGetFunc: () => IToken[]) {
    this.chainId = chainId;
    this.tokens = tokensGetFunc();
    this.addressMap = this.tokens.reduce((map, obj) => {
      map.set(obj.address, obj);
      return map;
    }, new Map<string, IToken>());
    this.symbolMap = this.tokens.reduce((map, obj) => {
      map.set(obj.symbol, obj);
      return map;
    }, new Map<string, IToken>());
  }

  query(address: string): Promise<IToken | undefined>;
  query(symbol: string): Promise<IToken | undefined>;
  async query(symbolOrAddress: string): Promise<IToken | undefined> {
    const _isSymbol = isSymbol(symbolOrAddress);
    const map = _isSymbol ? this.symbolMap : this.addressMap;
    return map.get(symbolOrAddress);
  }

  tokenArr(): IToken[] {
    return this.tokens;
  }
}

export class LocalTokenInquirer extends TokenInquirerBase {
  constructor(chainId: number) {
    super(chainId, () => chainIdToTokenArr(chainId));
  }
}

export class StorageTokenInquirer extends TokenInquirerBase {
  constructor(chainId: number) {
    const storage = window.localStorage;
    const key = `tokens-${chainId}`;
    super(chainId, () => JSON.parse(storage.getItem(key) ?? "[]") as IToken[]);
  }
}

export class ERC20TokenInquirer implements ITokenInquirer {
  chainId: number;
  private contract: IERC20Contract;

  constructor(chainId: number, contract: IERC20Contract) {
    this.chainId = chainId;
    this.contract = contract;
  }

  query(address: string): Promise<IToken | undefined>;
  query(symbol: string): Promise<IToken | undefined>;
  async query(addressOrSymbol: string): Promise<IToken | undefined> {
    const _isSymbol = isSymbol(addressOrSymbol);
    if (_isSymbol) return;
    const address = addressOrSymbol;
    const symbol = await this.contract.symbol(new Address(address));
    const chain = chainIdToName.get(this.chainId);
    if (!chain) throw new Error(`Chain id ${this.chainId} is not supported.`);
    return {
      address: address,
      symbol,
      logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chain}/assets/${address}/info.json`,
    } as IToken;
  }
}

export class ChainTokenInquirer implements ITokenInquirer {
  chainId: number;
  private chain: ITokenInquirer[];

  constructor(chainId: number, chain: ITokenInquirer[]) {
    this.chainId = chainId;
    this.chain = chain;
  }

  query(address: string): Promise<IToken | undefined>;
  query(symbol: string): Promise<IToken | undefined>;
  async query(addressOrSymbol: string): Promise<IToken | undefined> {
    let result;
    for (const inquirer of this.chain) {
      if (result) break;
      result = await inquirer.query(addressOrSymbol);
    }
    return result;
  }
}

export interface ITokenInquirerHolder {
  /**
   * get the inquirer corresponding to a chain. Throw an error when
   * the corresponding inquirer doesn't exist.
   */
  get(chainId: number): ITokenInquirer;
}

export class TokenInquirerHolderBase implements ITokenInquirerHolder {
  private map: Map<number, ITokenInquirer>;

  constructor(newFunc: (chainId: number) => ITokenInquirer) {
    this.map = new Map();
    for (const key of chainIdToName.keys()) {
      this.map.set(key, newFunc(key));
    }
  }

  get(chainId: number): ITokenInquirer {
    const result = this.map.get(chainId);
    if (!result) throw new Error(`Chain id ${chainId} is not support.`);
    return result;
  }
}

export class LocalTokenInquirerHolder extends TokenInquirerHolderBase {
  constructor() {
    super((key) => new LocalTokenInquirer(key));
  }
}

export const localTokenInquirerHolder = new LocalTokenInquirerHolder();

export class StorageTokenInquirerHolder extends TokenInquirerHolderBase {
  constructor() {
    super((key) => new StorageTokenInquirer(key));
  }
}

export const storageTokenInquirerHolder = new StorageTokenInquirerHolder();
