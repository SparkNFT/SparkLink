import Crypto from "crypto-js";
import { hexToBytes } from "web3-utils";

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function encrypt(raw: Uint8Array): {
  encrypted: string;
  password: string;
} {
  const password = makeid(32);
  const wordArray = Crypto.lib.WordArray.create(raw);
  const str = "0x" + Crypto.enc.Hex.stringify(wordArray);
  const encrypted = Crypto.AES.encrypt(str, password).toString();
  return { encrypted, password };
}

export function decrypt(encrypted: string, password: string): Uint8Array {
  let decrypted = Crypto.AES.decrypt(encrypted, password);
  decrypted = decrypted.toString(Crypto.enc.Utf8);
  decrypted = hexToBytes(decrypted);
  return new Uint8Array(decrypted);
}
