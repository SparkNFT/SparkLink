import { Axios } from "axios";

interface IBasePayload {
  account: string;
  chainId: number;
  nft_id: string;
  timestamp: string;
}

export type IAuthorizationPayload = IBasePayload;

export interface IClaimPinataApiKeyReturnValue {
  apiKey: string;
  secretApiKey: string;
}

export interface IStoreEncryptPasswordPayload {
  password: string;
}

export interface IKeyServerClient {
  claimPinataApiKey(): Promise<IClaimPinataApiKeyReturnValue>;

  storeEncryptPassword(payload: IStoreEncryptPasswordPayload): Promise<void>;
}

export default class Client implements IKeyServerClient {
  private static readonly ClaimPinataApiKeyPath = "/api/v1/key/claim";
  private static readonly StoreEncryptPassword = "/api/vi/encryptPassword"
  private readonly axios: Axios;

  static async getAuthorization(payload: IAuthorizationPayload, sign: (payload: string) => Promise<string>) {
    const str =JSON.stringify(payload);
    const signature = await sign(str);
    return JSON.stringify({payload: str, signature});
  }

  // The axios instance should have been configured with a correct base url.
  // It's default config will be modified by the constructor, so the instance should not be shared.
  // The authorization parameter should be the return value of the call to the 
  // <code>getAuthorization</code> function.
  constructor(axios: Axios, authorization: string) {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = authorization;
    this.axios = axios;
  }

  async claimPinataApiKey() {
    const response = await this.axios.post(Client.ClaimPinataApiKeyPath, JSON.stringify({}));
    const data = response.data.pinata;
    return { apiKey: data.api_key, secretApiKey: data.api_secret };
  }

  async storeEncryptPassword(payload: IStoreEncryptPasswordPayload) {
    const str = JSON.stringify(payload);
    await this.axios.put(Client.StoreEncryptPassword, str);
  };
}
