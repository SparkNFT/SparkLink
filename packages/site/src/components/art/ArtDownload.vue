<template>
  <el-button
    type="primary"
    class="operator-btn"
    :disabled="!canDownload"
    @click="clickDownloadButton"
  >
    {{ t("download") }}
  </el-button>
  <DownloadInProgress
    v-if="downloadInProcess"
    v-model="downloadInProcess"
    style="text-align: left"
    :event-emitter="eventEmitter"
    :encrypted="encrypted"
    @listeners:attached="download"
  ></DownloadInProgress>
</template>

<script lang="ts" setup>
import { DownloadEventEmitter } from "@SparkLink/business";
import type { IContentDownloader } from "@SparkLink/business/generated/src/downloader";
import type { UserOperatorFactory } from "@SparkLink/business";
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import DownloadInProgress from "./DownloadInProgress.vue";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const { t } = useI18n({
  messages: {
    en: {
      download: "Download",
    },
    "zh-CN": {
      download: "下载",
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
const account = computed(() => store.state.web3.account as string);
const isOwner = computed(() => props.metadata.owner.value === account.value);

const eventEmitter = ref(null as DownloadEventEmitter | null);
const encrypted = computed(() => props.metadata.encrypted ?? false);
const downloader = ref(null as IContentDownloader | null);
const downloadInProcess = ref(false);
const canDownload = computed(() => {
  if (!factory.value || !props.metadata) return false;
  const _meta = props.metadata;
  if (!isOwner.value) {
    if (_meta.encrypted === false) return true;
    return false;
  }
  return true;
});

function setDownloader(
  emitter: DownloadEventEmitter,
  _downloader: IContentDownloader
) {
  eventEmitter.value = emitter;
  downloader.value = _downloader;
  downloadInProcess.value = true;
}

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
</script>

<style scoped lang="scss">
.operator-btn {
  width: 358px;
  --el-font-size-medium: 24px;
  font-weight: 700;
  height: 70px;
  border-radius: 16px;
  flex: 1;
}
</style>
