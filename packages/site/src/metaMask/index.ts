import detectEthereumProvider from "@metamask/detect-provider";
import { createStore } from "vuex";

let provider;

function retrieveFromLocalStorage() {
  const storage = window.localStorage;
  return { canConnect: storage.getItem("canConnect") === "true" };
}

function saveToLocalStorage(metaMask) {
  window.localStorage.setItem("canConnect", String(metaMask.canConnect));
}

interface State {
  account: string;
  // User permit us to connect our site to his wallet if true.
  canConnect: boolean;
  hasProvider: boolean;
}

export const metaMask = createStore({
  state(): State {
    const retrieved = retrieveFromLocalStorage();
    const state = {
      account: "",
      canConnect: retrieved.canConnect,
      hasProvider: false,
    };
    saveToLocalStorage(state);
    return state;
  },
  mutations: {
    update(state: State, payload: State) {
      state.account = payload.account;
      state.canConnect = payload.canConnect;
      saveToLocalStorage(payload);
    },

    updateProvider(state: State, hasProvider: boolean) {
      state.hasProvider = hasProvider;
    },
  },
});

// This function new a wallet provider and store it in the `provider` variable.
// When the provider doesn't exists, return false.
async function initProvider() {
  provider = await detectEthereumProvider();
  metaMask.commit("updateProvider", !!provider);
  return !!provider;
}

export async function ensureProvider() {
  if (!provider) return await initProvider();
  return true;
}

// Only try to connect to the wallet if user permit.
export async function connectWhenNeed() {
  if (metaMask.state.canConnect) await ensureConnect();
}

// Connect to the wallet, no matter whether user agree or not.
// This is usually used when the user want to connect for the first time.
// When there is a provider, return true; if user block connect, throw a error.
export async function ensureConnect() {
  if (!provider) {
    const hasProvider = await ensureProvider();
    if (!hasProvider) return false;
  }

  const account = await provider.request({ method: "eth_requestAccounts" });
  metaMask.commit("update", { account: account[0], canConnect: true });
  return true;
}

export async function disconnect() {
  metaMask.commit("update", { account: "", canConnect: false });
}
