import Crypto from "crypto-js";
import {decrypt, encrypt} from "../../src/utils/crypt";
import {hexToUtf8} from "web3-utils";
import {expect} from "chai";

describe("crypto", function () {
	beforeEach(function () {
		const textEncoder = new TextEncoder();
		this.input = new Uint8Array(textEncoder.encode("hello world!"));
	});

	context("function encrypt", function () {
		it("should parse a uint8array into a AES encrypted string and a password.", function () {
			const input: Uint8Array = this.input;
			const {encrypted, password} = encrypt(input);
			let decrypted = Crypto.AES.decrypt(encrypted, password);
			decrypted = decrypted.toString(Crypto.enc.Utf8);
			decrypted = hexToUtf8(decrypted);
			expect(decrypted).to.equal("hello world!");
		});
	});

	context("function decrypt", function () {
		it("should decrypt a AES encrypted string into a uint8array.", function () {
			const input: Uint8Array = new Uint8Array([1, 12, 0, 200, 0, 0]);
			const {encrypted, password} = encrypt(input);
			const decrypted = decrypt(encrypted, password);
			expect(decrypted).to.deep.equal(input);
		});
	});
});
