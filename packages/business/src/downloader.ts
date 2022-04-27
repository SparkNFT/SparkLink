import { Axios } from "axios";
import { decrypt } from "./utils/crypt";
import { EventEmitter } from "eventemitter3";

export interface IContentDownloader {
  download(
    contentUrl: string,
    eventEmitter?: IContentDownloadEventEmitterEmits
  ): Promise<Uint8Array>;
}

// This class is used to download the content zip from the ipfs network.
// If the zip is encrypted, then it's gotten decrypted first.
export class ContentDownloader implements IContentDownloader {
  private readonly axios: Axios;
  private readonly encypted: boolean;
  private readonly encryptedPassword: string | undefined;
  constructor(axios: Axios, encrypted: boolean, encryptedPassword?: string) {
    this.axios = axios;
    this.encypted = encrypted;
    this.encryptedPassword = encryptedPassword;
  }

  // Download the zip and decypt it if need.
  async download(
    contentUrl: string,
    eventEmitter?: IContentDownloadEventEmitterEmits
  ): Promise<Uint8Array> {
    let data = (
      await this.axios.get(contentUrl, { responseType: "arraybuffer" })
    ).data;
    eventEmitter?.emit("downloaded", data);
    if (this.encypted) {
      eventEmitter?.emit("beginDecypted");
      data = decrypt(new TextDecoder().decode(data), this.encryptedPassword);
      eventEmitter?.emit("decypted", data);
    }
    return data;
  }
}

export interface IContentDownloadEventEmitter {
  on(event: "downloaded", callback: (content: Uint8Array) => void);
  on(event: "beginDecypted", callback: () => void);
  on(event: "decypted", callback: (decypted: Uint8Array) => void);
}

export interface IContentDownloadEventEmitterEmits {
  emit(event: "downloaded", content: Uint8Array);
  emit(event: "beginDecypted");
  emit(event: "decypted", decypted: Uint8Array);
}

export class DownloadEventEmitter
  extends EventEmitter
  implements IContentDownloadEventEmitter, IContentDownloadEventEmitterEmits {}
