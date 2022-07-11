<template>
  <Dialog :model-value="modelValue" @update:model-value="emitModelValue">
    <template #desktop>
      <Timeline :progress="progress" :items="timelineItems"></Timeline>
    </template>
    <template #mobile>
      <Timeline :progress="progress" :items="timelineItems"></Timeline>
      <el-button type="primary" @click="emitModelValue(false)">Close</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
// Scope: Transient

import { DownloadEventEmitter, UserOperatorFactory } from "@SparkLink/business";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { getNftInfo } from "../../store/info";
import Dialog from "../Dialog.vue";
import Timeline from "../Timeline.vue";
import type { ITimelineItem } from "../types";
import { NftInformation } from "./types";

console.log("Downloading...");

const { t } = useI18n({
  messages: {
    en: {
      steps: {
        download: {
          before: "Download",
          doing: "Downloading",
          after: "Downloaded",
        },
        decrypt: {
          before: "Decrypt",
          doing: "Decrypting",
          after: "Decrypted",
        },
      },
    },
    "zh-CN": {
      steps: {
        download: {
          before: "下载",
          doing: "下载中",
          after: "下载完成",
        },
        decrypted: {
          before: "解密",
          doing: "解密中",
          after: "解密完成",
        },
      },
    },
  },
});

const props = defineProps<{
  modelValue: boolean;
  nftId: string;
  metadata: NftInformation;
}>();

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
}

function setupTimeline() {
  const timelineItems = computed(() => {
    const timelineItems = [] as ITimelineItem[];
    timelineItems.push({
      before: t("steps.download.before"),
      doing: t("steps.download.doing"),
      after: t("steps.download.after"),
    });
    if (props.metadata.encrypted)
      timelineItems.push({
        before: t("steps.decrypt.before"),
        doing: t("steps.decrypt.doing"),
        after: t("steps.decrypt.after"),
      });
    return timelineItems;
  });
  const progress = ref(0);
  return { timelineItems, progress };
}

const { timelineItems, progress } = setupTimeline();

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
  const store = useStore();
  const factory = computed(
    () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
  );
  const downloader = await factory.value.getContentDownloader(
    props.metadata.encrypted,
    props.nftId
  );
  const eventEmitter = new DownloadEventEmitter();
  eventEmitter.on("downloaded", () => (progress.value = 1));
  eventEmitter.on("decypted", () => (progress.value = 2));
  const content = await downloader.download(
    props.metadata.urls.content,
    eventEmitter
  );
  downloadBlob(content, `${props.metadata.name}.zip`);
}

download();
</script>
