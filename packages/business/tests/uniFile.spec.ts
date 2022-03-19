import {readFile} from "fs/promises";
import {IUniFile, UniFile} from "../src/utils/uniFile";
import {join} from "path";
import {expect} from "chai";
import sinon from "sinon";
import {Blob} from "buffer";
import * as path from "path";

describe("class UniFile", function () {
	context("when read from a node buffer", function () {
		const filename = "hello.txt";
		const filePath = join(__dirname, "assets", filename);
		let file, uniFile: IUniFile;
		before(async function () {
			file = await readFile(filePath);
			uniFile = new UniFile({
				buffer: file,
				name: filename,
				path: filePath,
				type: "text/plain",
			});
		});
		it("has correct name and path stored in it.", function () {
			expect(uniFile.name).to.equal(filename);
			expect(uniFile.path).to.equal(filePath);
		});
		it("can produce a ArrayBuffer content.", async function () {
			const content = await uniFile.content("ArrayBuffer");
			expect(content).to.be.an.instanceof(ArrayBuffer);
		});
		it("can produce a Uint8Array content.", async function () {
			const content = await uniFile.content("Uint8Array");
			expect(content).to.be.an.instanceof(Uint8Array);
		});
		it("can do node specific operation in node environment.", async function () {
			const inBrowserMethod = sinon.spy();
			const inNodeMethod = sinon.spy();
			await uniFile.environmentSpecificOperate(inBrowserMethod, inNodeMethod);
			expect(inBrowserMethod.callCount).to.equal(0);
			expect(inNodeMethod.callCount).to.equal(1);
			const blob = inNodeMethod.args[0][0];
			expect(blob).to.be.an.instanceof(Blob);
			expect(blob.name).to.equal(filename);
			expect(blob.path).to.equal(filePath);
			expect(blob.type).to.equal("text/plain");
		});
	});
});
