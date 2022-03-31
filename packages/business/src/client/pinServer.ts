import { UniFile } from "../utils/uniFile";
import NodeFormData from "form-data";
import type { Axios } from "axios";
import { Buffer } from "buffer";
import { isBrowser } from "../utils/uniFile";

export interface PinFileReturnValue {
  ipfsHash: string;
  pinSize: number;
}

export interface IPinServerClient {
  pinFile(file: UniFile): Promise<PinFileReturnValue>;
  pinJson(obj: object): Promise<PinFileReturnValue>;
}

export class PinataServerClient implements IPinServerClient {
  private readonly key: string;
  private readonly secret: string;
  private readonly axios: Axios;
  private static readonly BASE_URL = "https://api.pinata.cloud";
  private static readonly ENDPOINT = `${this.BASE_URL}/pinning/pinFileToIPFS`;
  private static readonly PIN_JSON_ENDPOINT = `${this.BASE_URL}/pinning/pinJSONToIPFS`;

  constructor(axios: Axios, pinataApiKey: string, pinataSecretApiKey: string) {
    this.axios = axios;
    this.key = pinataApiKey;
    this.secret = pinataSecretApiKey;
  }

  async pinFile(file: UniFile): Promise<PinFileReturnValue> {
    const arrayBuffer = await file.content("ArrayBuffer");
    let content: Buffer | Blob;
    let formData: NodeFormData | FormData;
    if (isBrowser) {
      content = new Blob([arrayBuffer]);
      formData = new FormData();
      formData.append("file", content, "file");
    } else {
      content = Buffer.from(arrayBuffer);
      formData = new NodeFormData();
      formData.append("file", content, { filename: "file" });
    }
    const response = await this.axios.post(PinataServerClient.ENDPOINT, formData, this.getOptions(formData));
    const result = response.data;
    return { ipfsHash: result.IpfsHash, pinSize: result.PinSize };
  }

  async pinJson(obj: object): Promise<PinFileReturnValue> {
    const result = (await this.axios.post(PinataServerClient.PIN_JSON_ENDPOINT, obj, {
      withCredentials: true,
      headers: {
        'pinata_api_key': this.key,
        'pinata_secret_api_key': this.secret
      }
    })).data
    return { ipfsHash: result.IpfsHash, pinSize: result.PinSize };
  }

  private getOptions(data: NodeFormData | FormData) {
    return {
      withCredentials: true,
      maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
      maxBodyLength: Infinity,
      headers: this.getHeaders(data)
    }
  }

  private getHeaders(data: NodeFormData | FormData) {
    const result = {
      pinata_api_key: this.key,
      pinata_secret_api_key: this.secret,
    };
    if (!isBrowser)
      result["Content-type"] = `multipart/form-data; boundary= ${(data as NodeFormData).getBoundary()}`
    return result;
  }
}

export class PinataSeverClientBuilder {
  private _axios?: Axios;
  private _key: string;
  private _secret: string;

  axios(axios: Axios) {
    this._axios = axios;
    return this;
  }

  hasAxios() {
    return !!this._axios;
  }

  apiKey(key: string, secret: string) {
    this._key = key;
    this._secret = secret;
    return this;
  }

  hasApiKey() {
    return !!this._secret;
  }

  canBuild() {
    return this.hasAxios() && this.hasApiKey();
  }

  build() {
    if (!this.canBuild()) {
      throw new Error("Client can not be built.");
    }
    return new PinataServerClient(this._axios, this._key, this._secret);
  }
}
