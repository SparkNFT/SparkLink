<template>
  <el-card shadow="never" :class="{ 'button-area': true, mobile: !grid.sm }">
    <template v-if="isOwner">
      <el-button
        type="primary"
        :disabled="!canDownload"
        @click="clickDownloadButton"
        >{{ t("download") }}</el-button
      >
      <el-button type="primary" plain style="flex: 1" disabled>
        {{ t("recieveIncome", { profit }) }}
      </el-button>
    </template>
    <template v-else>
      <el-button type="primary" style="flex: 1" @click="mint">{{
        t("mint")
      }}</el-button>
      <MintInProgress
        v-if="mintInProgress"
        v-model="mintInProgress"
        :metadata="metadata"
        :nft-id="nftId"
      ></MintInProgress>
    </template>
    <DownloadInProgress
      v-if="downloadInProcess"
      v-model="downloadInProcess"
      :event-emitter="eventEmitter as IContentDownloadEventEmitter"
      :encrypted="encrypted"
      @listeners:attached="download"
    ></DownloadInProgress>
  </el-card>
</template>

<script lang="ts" setup>
import { grid } from "../../grid";
import { DownloadEventEmitter } from "@SparkLink/business";
import type {
  UserOperatorFactory,
  IContentDownloadEventEmitter,
} from "@SparkLink/business";
import type { IContentDownloader } from "@SparkLink/business/generated/src/downloader";
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import type Web3 from "web3";
import { getSymbol } from "../../token";
import DownloadInProgress from "./DownloadInProgress.vue";
import { useRouter } from "vue-router";
import MintInProgress from "./MintInProgress.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      download: "Download",
      recieveIncome: "Recieve income ({profit})",
      mint: "Mint",
    },
    "zh-CN": {
      download: "下载",
      recieveIncome: "拉取收益（{profit}）",
      mint: "铸币",
    },
  },
});

const props = defineProps<{
  metadata: INftInformation;
  nftId: string;
}>();

const store = useStore();
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const web3 = computed(() => store.state.web3.web3 as Web3);
const tokenAddress = computed(() => props.metadata.paymentCurrency.value);
const chainId = computed(() => store.state.web3.chainId as number);
const symbol = computed(() =>
  getSymbol(chainId.value, tokenAddress.value as string)
);
const account = computed(() => store.state.web3.account as string);
const isOwner = computed(() => props.metadata.owner.value === account.value);

const profit = computed(() => {
  if (web3.value && props.metadata) {
    return `${web3.value.utils.fromWei(props.metadata.profit.toString())} ${
      symbol.value
    }`;
  }
  return undefined;
});

const canDownload = computed(() => {
  if (!factory.value || !props.metadata) return false;
  const _meta = props.metadata;
  if (!isOwner.value) {
    if (_meta.encrypted === false) return true;
    return false;
  }
  return true;
});

const canMint = computed(() => {
  if (!factory.value || !props.metadata || !account.value) return false;
  return true;
});

const eventEmitter = ref(null as DownloadEventEmitter | null);
const downloader = ref(null as IContentDownloader | null);
const encrypted = computed(() => props.metadata.encrypted ?? false);
const downloadInProcess = ref(false);
const mintInProgress = ref(false);

function setDownloader(
  emitter: DownloadEventEmitter,
  _downloader: IContentDownloader
) {
  eventEmitter.value = emitter;
  downloader.value = _downloader;
  downloadInProcess.value = true;
}

function resetDownloader() {
  eventEmitter.value = null;
  downloader.value = null;
}

watch(downloadInProcess, (a1, a2) => {
  console.log(a1, a2);
  if (!downloadInProcess.value) {
    resetDownloader();
  }
});

async function clickDownloadButton() {
  const nftId = props.nftId;
  if (!canDownload.value) return;
  const downloader = await factory.value.getContentDownloader(
    encrypted.value,
    nftId
  );
  const eventEmitter = new DownloadEventEmitter();
  setDownloader(eventEmitter, downloader);
}

function downloadURL(url: string, fileName: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
}

function downloadBlob(data: Uint8Array, fileName: string) {
  const blob = new Blob([data]);
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

async function download() {
  const _meta = props.metadata as INftInformation;
  const contentUrl = _meta.urls.content;
  const _downloader = downloader.value as IContentDownloader;
  const _emitter = eventEmitter.value as DownloadEventEmitter;
  const data = await _downloader.download(contentUrl, _emitter);
  downloadBlob(data, `${_meta.name}.zip`);
}

const router = useRouter();

async function mint() {
  mintInProgress.value = true;
}
</script>

<style lang="scss" scoped>
.button-area {
  :deep(.el-card__body) {
    display: flex;
  }
  &.mobile {
    border: none;
    :deep(.el-card__body) {
      flex-direction: column;
      gap: 16px;
      button + button {
        margin-left: unset;
      }
    }
  }
}
</style>
