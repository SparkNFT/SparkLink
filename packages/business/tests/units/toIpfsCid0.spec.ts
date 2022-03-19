import {readFile} from "fs/promises";
import {expect} from "chai";
import {fileToIpfsCid0, plainObjectToIpfsCid0} from "../../src/utils/toIpfsCid0";

describe("function fileToIpfsCid0", function () {
	it("should parse file to a version 0 IPFS CID.", async function () {
		const content: Uint8Array = await readFile(
			`${__dirname}/../assets/hello.txt`
		);
		const cid = await fileToIpfsCid0(content);
		expect(cid).to.equal("QmTu2jnNnTvK4fpUtQegcMzskiR6cZux2eQ79uyfCpvpLC");
	});
});

describe("function plainObjectToIpfsCid0", function () {
	it(
		"should parse plain object to a version 0 IPFS CID.", async function () {
			const payload = {
				name: "Hungary",
				description: "blah blah",
				image:
					"https://coldcdn.com/api/cdn/v5ynur/ipfs/QmNgy7qENnduHoegVtzxB92fVygzQdcrF32sFN4ohdWJQC",
				attributes: [
					{
						display_type: "boost_percentage",
						trait_type: "Bonuse Percentage",
						value: 1,
					},
					{
						trait_type: "File Address",
						value:
							"https://coldcdn.com/api/cdn/v5ynur/ipfs/QmbhzpB6RcH1Met4Rz7jZPWgM5YyQ9jec66miULHxwjm2D",
					},
					{value: "zip"},
					{trait_type: "Encrypted", value: "FALSE"},
				],
			};
			const cid = await plainObjectToIpfsCid0(payload);
			expect(cid).to.equal("QmdPHgyD4gfy5R5fD7A8gGrCTNrFpuSPNpWk43gQozkKft")
		});
});
