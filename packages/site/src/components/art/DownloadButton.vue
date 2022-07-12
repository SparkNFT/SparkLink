<template>
  <Button :type="type" class="btn" @click="start">
    <template #icon>
      <span class="material-icons-outlined">file_download</span>
    </template>
    <span>Download</span>
  </Button>
  <DownloadInProgress
    v-if="inDownload"
    v-model="inDownload"
    :nft-id="nftId"
    :metadata="metadata"
  ></DownloadInProgress>
</template>

<script lang="ts" setup>
import { web3InfoGetter } from "../../store";
import Button, { Type } from "../Button.vue";
import DownloadInProgress from "./DownloadInProgress.vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { NftInformation } from "./types";

const props = withDefaults(
  defineProps<{
    nftId: string;
    metadata: NftInformation;
    outlined?: boolean;
  }>(),
  { outlined: false }
);

const { t } = useI18n({
  messages: {
    en: {
      text: "Download",
    },
    "zh-CN": {
      text: "下载",
    },
  },
});

const type = computed(() => {
  const account = web3InfoGetter.account.value;
  const owned = props.metadata.owner.value === account;
  const canDownload = account && (owned || !props.metadata.encrypted);
  const defaultType = props.outlined ? Type.Outlined : Type.Default;
  return canDownload ? defaultType : Type.Disabled;
});

function setupDownload() {
  const inDownload = ref(false);
  function start() {
    inDownload.value = true;
  }
  return { inDownload, start };
}

const { inDownload, start } = setupDownload();
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.btn {
  @include desktop {
    min-width: 360px;
  }
  @include mobile {
    width: 80%;
  }
}
</style>
