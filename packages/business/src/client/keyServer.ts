import { Axios } from "axios";
import { keyServerBaseUrl } from "../config";
import { getAuthorizationExpiration } from "../utils/getAuthorizationExpiration";

export interface IClaimPinataApiKeyAndStoreEncryptPasswordPayload {
  account: string;
  chain: string;
  nft_id: string;
  // the password
  key: string;
  // expiration: number;
}

export interface IClaimPinataApiKeyAndStoreEncryptPasswordReturnValue {
  apiKey: string;
  secretApiKey: string;
}

export interface IRetrieveNftIdsPayload {
  chain: string;
  owner: string;
}

export interface IStoreNftIdPayload {
  nftId: string;
}

export interface IRetrieveEncryptPasswordPayload {
  account: string;
  chain: string;
  nft_id: string;
  // expiration: number;
}

export interface IKeyServerClient {
  claimPinataApiKeyAndStoreEncryptPassword(
    payload: IClaimPinataApiKeyAndStoreEncryptPasswordPayload
  ): Promise<IClaimPinataApiKeyAndStoreEncryptPasswordReturnValue>;

  retrieveNftIds(payload: IRetrieveNftIdsPayload): Promise<string[]>;

  retrieveEncryptPassword(
    payload: IRetrieveEncryptPasswordPayload
  ): Promise<string>;
}

export type FSign = (payload: string) => Promise<string>;

// DO NOT construct this directly. Using ClientBuilder instead.
// At the earliest time the `key` meant apiKey.
// But now, with the amount of the server's APIs growing, it means
// the MOST IMPORTANT situation of the server.
export default class Client implements IKeyServerClient {
  private static getBaseUrl() {
    return keyServerBaseUrl;
  }
  private static readonly BASE_URL = this.getBaseUrl();
  private static readonly API_VERSION = "v1";
  private static readonly BASE_URL_WITH_API_VERSION = `${this.BASE_URL}/api/${this.API_VERSION}`;
  private readonly axios: Axios;
  private _authorizationThings: { sign: FSign };
  private inited = false;

  // The axios's default config will be modified by the constructor, so the instance should not be shared.
  constructor(axios: Axios, sign: FSign) {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    this.axios = axios;
    this._authorizationThings = {
      sign: sign,
    };
  }

  async init() {
    if (this.inited) return;
    this.inited = true;
  }

  async claimPinataApiKeyAndStoreEncryptPassword(
    payload: IClaimPinataApiKeyAndStoreEncryptPasswordPayload
  ) {
    const url = `${Client.BASE_URL_WITH_API_VERSION}/key`;
    const _payload = { ...payload, expired_at: getAuthorizationExpiration() };
    const authorizationPayload = JSON.stringify(
      _payload,
      Object.keys(_payload).sort()
    );
    const authorization = await this._authorizationThings.sign(
      authorizationPayload
    );
    const actualPayload = { ..._payload, signature: authorization };
    const str = JSON.stringify(
      actualPayload,
      Object.keys(actualPayload).sort()
    );
    const data = (await this.axios.post(url, str)).data.pinata;
    return {
      apiKey: data.api_key,
      secretApiKey: data.api_secret,
    } as IClaimPinataApiKeyAndStoreEncryptPasswordReturnValue;
  }

  async retrieveNftIds(payload: IRetrieveNftIdsPayload) {
    const url = `${Client.BASE_URL_WITH_API_VERSION}/nft/list`;
    const response = await this.axios.get(url, { params: payload });
    return response.data.nft as string[];
  }

  async retrieveEncryptPassword(payload: IRetrieveEncryptPasswordPayload) {
    const url = `${Client.BASE_URL_WITH_API_VERSION}/key`;
    const _payload = {
      ...payload,
      expired_at: getAuthorizationExpiration(),
    };
    const authorizationPayload = JSON.stringify(
      _payload,
      Object.keys(_payload).sort()
    );
    const authorization = await this._authorizationThings.sign(
      authorizationPayload
    );
    const actualPayload = { ..._payload, signature: authorization };
    const data = (await this.axios.get(url, { params: actualPayload })).data;
    return data.key as string;
  }
}

export class ClientBuilder {
  private _axios?: Axios;
  private _sign?: (payload: string) => Promise<string>;

  axios(axios: Axios) {
    this._axios = axios;
    return this;
  }

  hasAxios() {
    return !!this._axios;
  }

  sign(sign: (payload: string) => Promise<string>) {
    this._sign = sign;
  }

  hasSign() {
    return !!this._sign;
  }

  canBuild() {
    return this.hasAxios() && this.hasSign();
  }

  async build() {
    if (!this.canBuild()) {
      throw new Error("This builder can't build a client now.");
    }
    const client = new Client(this._axios, this._sign);
    await client.init();
    return client;
  }
}
