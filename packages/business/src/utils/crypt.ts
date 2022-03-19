import Crypto from "crypto-js";
import RandomString from "randomstring";
import {hexToBytes} from "web3-utils";

export function encrypt(raw: Uint8Array): {
	encrypted: string;
	password: string;
} {
	const password = RandomString.generate(32);
	const wordArray = Crypto.lib.WordArray.create(raw);
	const str = "0x" + Crypto.enc.Hex.stringify(wordArray);
	const encrypted = Crypto.AES.encrypt(str, password).toString();
	return {encrypted, password};
}

export function decrypt(encrypted: string, password: string): Uint8Array {
	let decrypted = Crypto.AES.decrypt(encrypted, password);
	decrypted = decrypted.toString(Crypto.enc.Utf8);
	decrypted = hexToBytes(decrypted);
	return new Uint8Array(decrypted);
}
