<template>
  <el-dialog
    :model-value="modelValue"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @update:model-value="emitModelValue"
  >
    <template #title> Executing </template>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timeLine"
        :key="index"
        :type="item.type"
        :hollow="item.hollow"
        :timestamp="item.timestamp"
      >
        {{ item.title }}
      </el-timeline-item>
    </el-timeline>
    <div class="divider" />
    <div class="container">
      <span class="description" v-if="!canClose">
        Please DO NOT close this page until all steps completed.
      </span>
      <span class="description" v-else>
        Published. The NFT ID is: {{ nftId }}.
      </span>
      <el-button
        type="primary"
        :disabled="!canClose"
        @click="emitModelValue(false)"
        >Close</el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
// Scope: Transient

import { IUploadEventEmitter } from "@SparkLink/business";
import { computed, reactive, watch, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  modelValue: boolean;
  eventEmitter: IUploadEventEmitter | null;
  encryted: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "published", value: string): void;
  (e: "listeners:attached"): void;
}>();

function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
  if (!value)
    getInitTimeLine().forEach((v, i) => {
      timeLine[i] = v;
    });
    nftId.value = "";
}

const store = useStore();
const minConfirmationNum = computed(
  () => store.state.web3.minConfirmationNum as number
);
interface ITimeLineItem {
  title: string;
  timestamp: string;
  display: boolean;
  type: "primary" | undefined;
  hollow: boolean;
}

enum Stage {
  GenerateZip = "Generate zip",
  Encrypt = "Encrypt",
  Publish = "Publish",
  SignRequest = "Sign request",
  PinCover = "Pin cover",
  PinContent = "Pin content",
  PinMetadata = "Pin metadata",
}

function getInitTimeLine() {
  return [
    Stage.GenerateZip,
    Stage.Encrypt,
    Stage.Publish,
    Stage.SignRequest,
    Stage.PinCover,
    Stage.PinContent,
    Stage.PinMetadata,
  ].map((title) => ({
    title,
    timestamp: "waiting...",
    display: true,
    hollow: false,
  })) as ITimeLineItem[];
}

const timeLine = reactive(getInitTimeLine());

const timeLineDoingTitles = [
  "Generating zip",
  "Ecypting",
  "Publishing",
  "Siging request",
  "Pinning cover",
  "Pinning content",
  "Pinning metadata",
];

const timeLineDoneTitles = [
  "Generated zip",
  "Ecypted",
  "Published",
  "Signed request",
  "Pinned cover",
  "Pinned content",
  "Pinned metadata",
];

const canClose = ref(false);
const nftId = ref("");

function doing(index: number) {
  timeLine[index].title = timeLineDoingTitles[index];
  timeLine[index].timestamp = "executing...";
  timeLine[index].type = "primary";
  timeLine[index].hollow = true;
}

function done(index: number) {
  timeLine[index].title = timeLineDoneTitles[index];
  timeLine[index].timestamp = new Date().toLocaleTimeString("it-IT");
  timeLine[index].hollow = false;
}

function updateZipData(percent: number) {
  const index = 0;
  timeLine[index].title = `${timeLineDoingTitles[index]} [${percent}%]`;
}

function updatePublishData(conf: number) {
  const index = 2;
  timeLine[
    index
  ].title = `${timeLineDoingTitles[index]}, Confirm: [${conf}/${minConfirmationNum.value}]`;
}

function finish() {
  canClose.value = true;
  emit("published", nftId.value);
}

watch(
  () => props.encryted,
  (encrypted) => {
    timeLine[1].display = encrypted;
  }
);

watch(
  () => props.eventEmitter,
  (eventEmitter) => {
    if (!eventEmitter) return;
    eventEmitter.on("beginGeneratingZip", () => {
      doing(0);
    });
    eventEmitter.on("processingZip", (percent: number) => {
      updateZipData(percent);
    });
    eventEmitter.on("zipGenerated", () => {
      done(0);
      if (props.encryted) {
        doing(1);
      } else {
        done(1);
        doing(2);
      }
    });
    eventEmitter.on("encrypted", () => {
      done(1);
      doing(2);
    });
    eventEmitter.on("publishConfirmation", (confirm: number) => {
      updatePublishData(confirm);
    });
    eventEmitter.on("published", ({rootNftId}) => {
      done(2);
      doing(3);
      nftId.value = rootNftId;
    });
    eventEmitter.on("signedRequest", () => {
      done(3);
      doing(4);
    });
    eventEmitter.on("coverPined", () => {
      done(4);
      doing(5);
    });
    eventEmitter.on("contentPined", () => {
      done(5);
      doing(6);
    });
    eventEmitter.on("metadataPined", (rootNftId: string) => {
      done(6);
      finish();
    });
    emit("listeners:attached");
  }
);
</script>

<style lang="scss" scoped>
.divider {
  height: 24px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
