/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Module } from "vuex";
import type Web3 from "web3";
// @ts-ignore
import { UserOperatorFactory } from "@SparkLink/business";
import { IProvider, ProviderHolder, WalletProvider } from "./provider";
import {
  chainIdToName,
  ChainTokenInquirer,
  ERC20TokenInquirer,
  localTokenInquirerHolder,
  storageTokenInquirerHolder,
} from "../token";

export interface IWalletConnectionInfo {
  // If this's true, a fresh load of the page should establish connection to wallect automaticly.
  allowConnection: boolean;
  provider: WalletProvider;
}

const walletConnectionInfoOperator = {
  localStorage: {
    allowConnectionStr: "allowConnection",
    providerStr: "provider",
    retrieve() {
      const storage = window.localStorage;
      return {
        allowConnection: storage.getItem(this.allowConnectionStr) === "true",
        provider: storage.getItem(this.providerStr),
      } as IWalletConnectionInfo;
    },
    store(payload: IWalletConnectionInfo) {
      window.localStorage.setItem(
        this.allowConnectionStr,
        payload.allowConnection.toString()
      );
      if (payload.provider)
        window.localStorage.setItem(this.providerStr, payload.provider);
      else window.localStorage.removeItem(this.providerStr);
    },
  },
};

export const walletConnectionInfoStore = {
  namespaced: true,
  state() {
    const data = walletConnectionInfoOperator.localStorage.retrieve();
    return data;
  },
  mutations: {
    setAllowConnection(state, value) {
      state.allowConnection = value;
    },
    setProvider(state, value) {
      state.provider = value;
    },
  },
  actions: {
    store(context) {
      const state: IWalletConnectionInfo = context.state;
      walletConnectionInfoOperator.localStorage.store(state);
    },
  },
} as Module<IWalletConnectionInfo, any>;

export const networkSelectOptions = Array.from(chainIdToName).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);

const chainIdToContractAddress = new Map<number, string>();
chainIdToContractAddress.set(4, "0x3Bdc8834cFB7E01cB27a31f4F02274bF2b27246C");
chainIdToContractAddress.set(137, "0xb83A6A35F1468BEA014e6Aa014300128D34ee433");

export interface IWeb3 {
  account: string;
  chainId: number;
  contractAddress: string;
  web3: Web3 | undefined;
  minConfirmationNum: number;
  _userOperatorFactory: UserOperatorFactory;
}

const holder = new ProviderHolder();
export const canSwitchNetwork = () => holder.currentProvider?.canSwitchNetwork;

export function recommendProvider() {
  return holder.recommend();
}

function checkProvider() {
  if (!holder.currentProvider) throw new Error("No provider found");
}

export const web3Store = {
  namespaced: true,
  state() {
    const data = {
      account: "",
      chainId: -1,
      contractAddress: "",
      minConfirmationNum: 6,
    } as IWeb3;
    return data;
  },
  mutations: {
    setAccount(state, account: string) {
      if (!account) state.account = account;
      if (!state.web3) return;
      state.account = account;
    },
    setChain(
      state,
      { chainId, contractAddress }: { chainId: number; contractAddress: string }
    ) {
      (state.chainId = chainId), (state.contractAddress = contractAddress);
    },
    setUserOperatorFactory(
      state,
      { userOperatorFactory }: { userOperatorFactory: UserOperatorFactory }
    ) {
      state._userOperatorFactory = userOperatorFactory;
    },
  },
  getters: {
    hasProvider(state) {
      return !!state.web3;
    },
    chainName(state) {
      if (state.chainId === -1) return "";
      return chainIdToName.get(state.chainId) ?? "other";
    },
    userOperatorFactory(state) {
      return state._userOperatorFactory;
    },
    chainTokenInquirer(state, getters) {
      const userOperatorFactory = getters.userOperatorFactory as
        | UserOperatorFactory
        | undefined;
      if (userOperatorFactory) {
        const chain = [
          localTokenInquirerHolder,
          storageTokenInquirerHolder,
        ].map((holder) => holder.get(state.chainId));
        chain.push(
          new ERC20TokenInquirer(
            state.chainId,
            userOperatorFactory.ERC20Contract
          )
        );
        const chainTokenInquirer = new ChainTokenInquirer(state.chainId, chain);
        return chainTokenInquirer;
      }
      return undefined;
    },
  },
  actions: {
    async useMetaMask(context) {
      const provider = await holder.useMetamask();
      context.state.web3 = provider.web3;
      await context.dispatch("updateUserFactory");
    },
    async useWalletConnect(context) {
      const provider = await holder.useWalletConnect();
      provider.onChianChange((id) => {
        console.log(id);
        context.dispatch("fulfillChain");
      });
      context.state.web3 = provider.web3;
      await context.dispatch("updateUserFactory");
    },
    async disconnect(context) {
      context.state.web3 = undefined;
      await context.dispatch("removeAccount");
      await context.dispatch("removeChain");
      await holder.clear();
    },
    // Request account from provider, and store it in the state.
    async requestAccount(context) {
      checkProvider();
      const account = await (holder.currentProvider as IProvider).getAccount();
      if (!account) {
        throw new Error("Account request has failed!");
      }
      context.commit("setAccount", account);
      await context.dispatch("updateUserFactory");
      return account;
    },
    async removeAccount(context) {
      context.commit("setAccount", "");
      await context.dispatch("updateUserFactory");
    },
    async fulfillChain(context) {
      checkProvider();
      const chainId = await (context.state.web3 as Web3).eth.getChainId();
      context.commit("setChain", {
        chainId,
        contractAddress: chainIdToContractAddress.get(chainId) ?? "",
      });
      context.dispatch("updateUserFactory");
      return chainId;
    },
    async removeChain(context) {
      context.commit("setChain", { chainId: -1, contractAddress: "" });
       await context.dispatch("updateUserFactory");
    },
    async switchNetwork(context, chainId: number) {
      checkProvider();
      if (!(holder.currentProvider as IProvider).canSwitchNetwork) {
        throw new Error("The provider does not support switch network.");
      }
      await (holder.currentProvider as IProvider).switchNetwork(chainId);
      await context.dispatch("fulfillChain");
    },
    async updateUserFactory({ state, commit }) {
      const chainName = chainIdToName.get(state.chainId);
      let userOperatorFactory;
      if (chainName && state.web3) {
        userOperatorFactory = new UserOperatorFactory(
          state.web3 as Web3,
          state.account,
          chainName as string,
          state.chainId,
          state.contractAddress,
          state.minConfirmationNum
        );
        await userOperatorFactory.init();
      }
      commit("setUserOperatorFactory", { userOperatorFactory });
    },
  },
} as Module<IWeb3, any>;
