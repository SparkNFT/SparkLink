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

import type { IContentDownloadEventEmitter } from "@SparkLink/business";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "../Dialog.vue";
import Timeline from "../Timeline.vue";
import type { ITimelineItem } from "../types";

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
  eventEmitter: IContentDownloadEventEmitter;
  encrypted: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "listeners:attached"): void;
}>();

function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
}

const timelineItems = [] as ITimelineItem[];
timelineItems.push({
  before: t("steps.download.before"),
  doing: t("steps.download.doing"),
  after: t("steps.download.after"),
});
if (props.encrypted)
  timelineItems.push({
    before: t("steps.decrypt.before"),
    doing: t("steps.decrypt.doing"),
    after: t("steps.decrypt.after"),
  });

const progress = ref(0);
props.eventEmitter.on("downloaded", () => (progress.value = 1));
props.eventEmitter.on("decypted", () => (progress.value = 2));
emit("listeners:attached");
</script>
