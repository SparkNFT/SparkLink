import {isBrowser, isNode} from "browser-or-node";
import type {Blob as NodeBlob, Buffer as NodeBuffer} from "buffer";

type Environment = "node" | "browser" | "unsupported";

let currentEnvironment: Environment = isBrowser
	? "browser"
	: isNode
		? "node"
		: "unsupported";

validateEnvironment();

export function setCurrentEnvironment(environment: Environment) {
	currentEnvironment = environment;
	validateEnvironment();
}

function validateEnvironment() {
	if (currentEnvironment != "node" && currentEnvironment != "browser")
		throw new Error(`Environment "${currentEnvironment}" is not supported`);
}

let nodeBuffer;

async function importNodeBuffer() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	nodeBuffer = await import("buffer");
	return nodeBuffer;
}

export interface IUniFile {
	readonly name: string;
	readonly path: string;

	content(type: "ArrayBuffer"): Promise<ArrayBuffer>;

	content(type: "Uint8Array"): Promise<Uint8Array>;

	environmentSpecificOperate<T>(
		inBrowser?: (file: Blob) => Promise<T>,
		inNode?: (file: NodeBlob) => Promise<T>
	): Promise<T>;
}

export class UniFile implements IUniFile {
	readonly name: string;
	readonly path: string;
	private readonly arrayBufferPromise: Promise<ArrayBuffer>;
	private readonly type: string;
	private _arrayBuffer: ArrayBuffer;

	private async getArrayBuffer() {
		if (!this._arrayBuffer) this._arrayBuffer = await this.arrayBufferPromise;
		return this._arrayBuffer;
	}

	private _browserBlob: Blob & { name: string; path: string };

	private async getBrowserBlob() {
		if (!this._browserBlob) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this._browserBlob = new Blob([await this.getArrayBuffer()], {
				type: this.type,
			});
			this._browserBlob.name = this.name;
			this._browserBlob.path = this.path;
		}
		return this._browserBlob;
	}

	private _nodeBlob: NodeBlob & { name: string; path: string };

	private async getNodeBlob() {
		if (!this._nodeBlob) {
			const buffer = await importNodeBuffer();
			this._nodeBlob = new buffer.Blob([await this.getArrayBuffer()], {
				type: this.type,
			});
			this._nodeBlob.name = this.name;
			this._nodeBlob.path = this.path;
		}
		return this._nodeBlob;
	}

	constructor(
		environmentSpecificFile:
			| File
			| { buffer: NodeBuffer; name: string; path: string; type: string }
	) {
		if (environmentSpecificFile["arrayBuffer"]) {
			const browserFile = environmentSpecificFile as File;
			this.arrayBufferPromise = browserFile.arrayBuffer();
			this.type = browserFile.type;
			this.name = browserFile.name;
			this.path = browserFile.webkitRelativePath ?? this.name;
		} else if (environmentSpecificFile["buffer"]) {
			const nodeBuffer = environmentSpecificFile as {
				buffer: NodeBuffer;
				name: string;
				path: string;
				type: string;
			};
			this.arrayBufferPromise = new Promise<ArrayBuffer>((resolve) =>
				resolve(nodeBuffer.buffer.buffer)
			);
			this.type = nodeBuffer.type;
			this.name = nodeBuffer.name;
			this.path = nodeBuffer.path ?? this.name;
		} else {
			throw new Error("the input file type is not supported.");
		}
	}

	async environmentSpecificOperate<T>(
		inBrowser?: (file: Blob & { name: string; path: string }) => Promise<T>,
		inNode?: (file: NodeBlob & { name: string; path: string }) => Promise<T>
	) {
		if (currentEnvironment === "browser") {
			if (!inBrowser) throw new MethodNotImplementError("inBrowser");
			return await inBrowser(await this.getBrowserBlob());
		} else {
			if (!inNode) throw new MethodNotImplementError("inNode");
			return await inNode(await this.getNodeBlob());
		}
	}

	content(type: "ArrayBuffer"): Promise<ArrayBuffer>;
	content(type: "Uint8Array"): Promise<Uint8Array>;
	async content(
		type: "ArrayBuffer" | "Uint8Array"
	): Promise<ArrayBuffer | Uint8Array> {
		const arrayBuffer = await this.getArrayBuffer();
		if (type === "ArrayBuffer") return arrayBuffer;
		else if (type === "Uint8Array") return new Uint8Array(arrayBuffer);
	}
}

export class MethodNotImplementError extends Error {
	constructor(functionName: string) {
		super(`the method "${functionName}" is not implemented.`);
	}
}
