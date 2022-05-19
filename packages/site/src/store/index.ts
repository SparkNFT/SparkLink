import { ElMessage } from "element-plus";
import { computed } from "vue";
import { createStore } from "vuex";
import { configStore } from "./config";
import { i18nInfoStore } from "./i18n";
import {
  NetworkNotExistsError,
  UserRejectError,
  WalletProvider,
} from "./provider";
import {
  walletConnectionInfoStore,
  web3Store,
  recommendProvider,
} from "./web3";
import { chainIdToName, ITokenInquirer } from "../token";

export const store = createStore({
  modules: {
    walletConnectionInfo: walletConnectionInfoStore,
    web3: web3Store,
    config: configStore,
    i18n: i18nInfoStore,
  },
});

class Web3Operator {
  static async setProvider(provider?: WalletProvider) {
    if (!provider) {
      provider = await recommendProvider();
    }
    if (provider === WalletProvider.metamask) {
      await store.dispatch("web3/useMetaMask");
    } else {
      await store.dispatch("web3/useWalletConnect");
    }
    return provider;
  }

  async connect() {
    if (store.state.web3.account) {
      return store.state.web3.account;
    } else {
      // ElMessage({
      //   message: "Preparing connecting...",
      //   type: "info",
      //   duration: 1000,
      // });
    }
    const provider = await Web3Operator.setProvider(
      store.state.walletConnectionInfo.provider
    );
    store.commit("walletConnectionInfo/setAllowConnection", true);
    store.commit("walletConnectionInfo/setProvider", provider);
    store.dispatch("walletConnectionInfo/store");
    await store.dispatch("web3/requestAccount");
    await store.dispatch("web3/fulfillChain");
    return store.state.web3.account;
  }

  async connectWhenNeed() {
    if (store.state.web3.account) return;
    const allowConnection = store.state.walletConnectionInfo.allowConnection;
    if (allowConnection) {
      await this.connect();
    }
  }

  async disconnect() {
    store.commit("walletConnectionInfo/setAllowConnection", false);
    store.commit("walletConnectionInfo/setProvider", undefined);
    await store.dispatch("walletConnectionInfo/store");
    await store.dispatch("web3/disconnect");
    console.log(store);
  }

  async switchNetwork(chainId: number) {
    try {
      await store.dispatch("web3/switchNetwork", chainId);
      return true;
    } catch (error) {
      if (error instanceof NetworkNotExistsError) {
        ElMessage.error(
          `The network ${chainIdToName.get(
            chainId
          )} has not been add to your wallet.`
        );
      } else if (error instanceof UserRejectError) {
        ElMessage.warning(`You have rejected the request.`);
      } else {
        console.error(error);
      }
      return false;
    }
  }
}

export const web3Operator = new Web3Operator();

// export const web3InfoGetter = {
//   get account() {
//     return computed(() => store.state.web3.account);
//   },
//   chain: {
//     get name() {
//       return computed(() => store.getters["web3/chainName"]);
//     },
//     get id() {
//       return computed(() => store.state.web3.chainId);
//     }
//   }
// }

export const web3InfoGetter = {
  account: computed(() => store.state.web3.account),
  chain: {
    name: computed(() => store.getters["web3/chainName"]),
    id: computed(() => store.state.web3.chainId),
  },
  hasProvider: computed(() => store.getters["web3/hasProvider"]),
  userOperatorFactory: computed(
    () => store.getters["web3/userOperatorFactory"]
  ),
  tokenInquirer: computed(
    () => store.getters["web3/chainTokenInquirer"] as ITokenInquirer
  ),
  web3: computed(() => store.getters["web3"]),
};

export const walletInfoGetter = {
  allowConnection: computed(
    () => store.state.walletConnectionInfo.allowConnection
  ),
};
