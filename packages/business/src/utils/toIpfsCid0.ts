import Hash from "ipfs-only-hash";

export async function fileToIpfsCid0(file: File | Uint8Array): Promise<string> {
	let buffer: Uint8Array;
	if (file instanceof Uint8Array) {
		buffer = file;
	} else if (file.arrayBuffer) {
		const arrayBuffer = await file.arrayBuffer();
		buffer = new Uint8Array(arrayBuffer);
	} else {
		throw Error("argument file should be a File or Unit8Array.");
	}
	return await Hash.of(buffer);
}

export async function plainObjectToIpfsCid0(obj: object) {
	const str = JSON.stringify(obj);
	return await Hash.of(str);
}