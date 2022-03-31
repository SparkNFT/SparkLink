<template>
  <Dialog
    :model-value="modelValue"
    width="fit-content"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #desktop>
      <Canvas
        :cover="cover"
        :name="name"
        :chain="chain"
        :price="_price"
        :url="url"
        :logo-url="logoUrl"
        width="100%"
        style="max-width: 450px; align-self: center"
      ></Canvas>
      <p class="center">{{ t("hint") }}</p>
    </template>
    <template #mobile>
      <Canvas
        :cover="cover"
        :name="name"
        :chain="chain"
        :price="_price"
        :url="url"
        :logo-url="logoUrl"
        width="100%"
        @update:image="updateImage"
      ></Canvas>
      <el-button @click="copy">{{ t("btn.copy") }}</el-button>
      <el-button type="primary" @click="download">{{
        t("btn.download")
      }}</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import type Web3 from "web3";
import Dialog from "../Dialog.vue";
import Canvas from "./Canvas.vue";

const { t } = useI18n({
  messages: {
    en: {
      hint: "Right click the image to copy or download.",
      btn: { copy: "Copy", download: "Download" },
      messages: {
        copy: "The poster has been copied into your clipboard.",
        download: "The poster has been downloaded.",
      },
    },
    "zh-CN": {
      hint: "右键点击图片以复制或下载",
      btn: { copy: "复制", download: "下载" },
      messages: {
        copy: "海报已复制",
        download: "海报已下载",
      },
    },
  },
});

const props = defineProps<{
  modelValue: boolean;
  cover: string;
  name: string;
  price: bigint;
  symbol: string;
  chain: string;
  url: string;
  logoUrl: string;
  style?: string;
  class?: string;
}>();

const store = useStore();
const web3 = computed(() => store.state.web3.web3 as Web3);

const _price = computed(() => {
  if (web3.value) {
    return `${web3.value.utils.fromWei(props.price.toString())} ${
      props.symbol
    }`;
  }
  return "";
});
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const img = ref(undefined as Blob | undefined);

async function updateImage(blob: Blob) {
  img.value = new Blob([await blob.arrayBuffer()], { type: blob.type });
}

async function copy() {
  if (!img.value) return;
  const blob = img.value;
  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
  ElMessage({ type: "success", message: t("messages.copy") });
}

async function download() {
  if (!img.value) return;
  const blob = img.value;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  (a.download = "poster.png"), a.click();
  ElMessage({ type: "success", message: t("messages.download") });
}
</script>

<style lang="scss" scoped>
.center {
  align-self: center;
}
</style>
