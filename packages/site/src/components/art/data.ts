import { computed, onMounted, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Web3 from "web3";
import { web3InfoGetter } from "../../store";
import { chainIdToName, IToken } from "../../token";
import { getNftInfo } from "../../store/info";

export function setupRoute() {
  const route = useRoute();
  const nftId = computed(() => route.params.nftId as string);
  const chainId = computed(() => parseInt(route.params.chainId as string));
  const chain = computed(() => chainIdToName.get(chainId.value) as string);

  return { route, nftId, chainId, chain };
}

export function setup() {
  const store = useStore();
  const { nftId, chainId } = setupRoute();
  function _reloadWhenNeed() {
    const metadata = ref(null as Awaited<ReturnType<typeof getNftInfo>> | null);

    async function _resetPage() {
      if (nftId.value) {
        metadata.value = await getNftInfo(chainId.value, nftId.value);
      } else {
        metadata.value = null;
      }
    }

    watch([nftId], _resetPage);
    onMounted(_resetPage);

    return metadata;
  }

  const metadata = _reloadWhenNeed();

  function _setToken() {
    const token = ref({ symbol: "Unknown" } as IToken);
    const tokenAddress = computed(() => metadata.value?.paymentCurrency.value);
    const tokenInquirer = web3InfoGetter.tokenInquirer;

    async function _setToken() {
      if (tokenAddress.value && tokenInquirer.value) {
        token.value = (await tokenInquirer.value.query(
          tokenAddress.value
        )) as IToken;
      }
    }

    watch([tokenAddress, tokenInquirer], _setToken);
    onMounted(_setToken);

    return token;
  }

  const token = _setToken();

  return { nftId, metadata };
}

export function toCoin(wei: bigint) {
  const web3 = Web3;
  return web3.utils.fromWei(wei.toString());
}

export function setupShareLink() {
  const store = useStore();
  const baseUrl = computed(() => store.state.config.frontendBaseUrl);
  const { chainId, nftId } = setupRoute();
  const shareLink = computed(
    () => `${baseUrl.value}/#/spark/${chainId.value}/${nftId.value}`
  );
  return { shareLink };
}