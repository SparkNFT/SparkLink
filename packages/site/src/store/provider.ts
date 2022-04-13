import detectEthereumProvider from "@metamask/detect-provider";
import _WalletConnectProvider from "@walletconnect/web3-provider";
import {readonly} from "vue";
import type Web3 from "web3";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Web3InBrowser from "web3/dist/web3.min.js";

export class MethodNotImplementError extends Error {
	constructor(funcName: string) {
		super(`Function ${funcName} has not been implemented.`);
	}
}

export type Web3Provider = unknown;

export interface IProviderGetter {
	avaliable(): Promise<boolean>;

	get(): Promise<IProvider>;
}

export interface IProvider {
	readonly web3: Web3;

	getAccount(): Promise<string>;

	readonly canSwitchNetwork: boolean;

	switchNetwork(chainId: number): Promise<void>;

	connect(): Promise<void>;

	disconnect(): Promise<void>;

	onChianChange(callback: (chainId: number) => void): void;
}

export class UnavaliableError extends Error {
	constructor() {
		super("This provider is unavaliable.");
	}
}

class ProviderGetterBase implements IProviderGetter {
	protected readonly getProviderPromiseFunc: () => Promise<Web3Provider>;
	protected readonly getProviderPromise: Promise<Web3Provider>;

	constructor(promiseFunc: () => Promise<Web3Provider>) {
		this.getProviderPromiseFunc = promiseFunc;
		this.getProviderPromise = promiseFunc();
	}

	async avaliable(): Promise<boolean> {
		return !!(await this.getProviderPromise);
	}

	protected async checkAvaliable() {
		if (!(await this.avaliable())) throw new UnavaliableError();
	}

	protected async _get(newProvider: (provider: Web3Provider) => IProvider) {
		await this.checkAvaliable();
		const web3Provider = await this.getProviderPromise;
		return newProvider(web3Provider);
	}

	private count = 0;

	protected async _new(
		newProvider: (provider: Web3Provider) => IProvider
	): Promise<IProvider> {
		if (this.count === 0) {
			const result = await this._get(newProvider);
			this.count++;
			return result;
		} else {
			await this.checkAvaliable();
			const result = await this.getProviderPromiseFunc();
			this.count++;
			return newProvider(result);
		}
	}

	async get(): Promise<IProvider> {
		throw new MethodNotImplementError("get");
	}
}

class ProviderBase implements IProvider {
	static readonly _name: string = "BaseProvider";
	protected readonly provider: Web3Provider;
	readonly canSwitchNetwork: boolean = false;
	private _web3: Web3 | undefined = undefined;

	constructor(web3Provider: Web3Provider) {
		this.provider = web3Provider;
	}

	get web3() {
		if (!this._web3) this._web3 = new Web3InBrowser(this.provider);
		return this._web3 as Web3;
	}

	async getAccount() {
		return await this.web3.eth.getAccounts().then((v) => v[0]);
	}

	async switchNetwork(_chainId: number) {
		throw new MethodNotImplementError("switchNetwork");
	}

	async connect() {
		await this.getAccount();
	}

	async disconnect() {
		return;
	}

	onChianChange(callback: (chainId: number) => void): void {
		return;
	}
}

export class MetamaskProviderGetter extends ProviderGetterBase {
	constructor() {
		super(detectEthereumProvider);
	}

	async get() {
		return await this._get((p) => new MetamaskProvider(p));
	}
}

export class UserRejectError extends Error {
}

export class NetworkNotExistsError extends Error {
	chainId: number;

	constructor(chainId: number, msg?: string) {
		super(msg);
		this.chainId = chainId;
	}
}

export class MetamaskProvider extends ProviderBase {
	static readonly _name = "Metamask";
	readonly canSwitchNetwork = true;

	async connect() {
		(await this.web3.eth.requestAccounts())[0];
	}

	override async switchNetwork(chainId: number): Promise<void> {
		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await this.provider.request({
				method: "wallet_switchEthereumChain",
				params: [
					{
						chainId: this.web3.utils.numberToHex(chainId),
					},
				],
			});
		} catch (error) {
			const code = (error as { code: number }).code;
			if (code === 4902) throw new NetworkNotExistsError(chainId);
			if (code === 4001) throw new UserRejectError();
			throw error;
		}
	}
}

export class WalletConnectProviderGetter extends ProviderGetterBase {
	constructor() {
		super(async () => {
			return new _WalletConnectProvider({
				infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
			});
		});
	}

	async get() {
		return await this._new(
			(p) => new WalletConnectProvider(p as _WalletConnectProvider)
		);
	}
}

export class WalletConnectProvider extends ProviderBase {
	static readonly _name = "WalletConnect";

	private readonly _provider: _WalletConnectProvider;

	constructor(provider: _WalletConnectProvider) {
		super(provider);
		this._provider = provider;
	}

	async connect(): Promise<void> {
		await this._provider.enable();
	}

	async disconnect(): Promise<void> {
		await this._provider.disconnect();
	}

	async onChianChange(callback: (chainId: number) => void) {
		this._provider.on("chainChanged", callback);
	}
}

export const metamaskProviderGetter = new MetamaskProviderGetter();
export const walletConnectProviderGetter = new WalletConnectProviderGetter();

export enum WalletProvider {
	metamask = "metamask",
	walletConnect = "wallet-connect",
}

export class ProviderHolder {
	private _currentProvider: IProvider | undefined;
	get currentProvider() {
		return this._currentProvider;
	}

	private set currentProvider(value) {
		if (this._currentProvider === value) return;
		this._currentProvider?.disconnect();
		this._currentProvider = value;
	}

	private async use(
		getter: IProviderGetter,
		_class: new (web3Provider: any) => IProvider
	) {
		if (!(this.currentProvider instanceof _class)) {
			const provider = await getter.get();
			await provider.connect();
			this.currentProvider = provider;
		}
		return this.currentProvider;
	}

	async useMetamask() {
		return await this.use(metamaskProviderGetter, MetamaskProvider);
	}

	async useWalletConnect() {
		return await this.use(walletConnectProviderGetter, WalletConnectProvider);
	}

	async recommend(): Promise<WalletProvider> {
		return (await metamaskProviderGetter.avaliable())
			? WalletProvider.metamask
			: WalletProvider.walletConnect;
	}

	async clear(): Promise<void> {
		this.currentProvider = undefined;
	}
}
