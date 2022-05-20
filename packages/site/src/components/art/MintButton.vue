<template>
  <Button :type="Type.Default" class="btn" @click="show = true">
    <template #icon>
      <span class="material-icons-outlined">local_fire_department</span>
    </template>
    <span>{{ t("text") }}</span>
  </Button>
  <MintInProgress
    v-if="show"
    v-model="show"
    :metadata="metadata"
    :nft-id="nftId"
  ></MintInProgress>
</template>

<script lang="ts" setup>
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Button, { Type } from "../Button.vue";
import MintInProgress from "./MintInProgress.vue";

defineProps<{
  nftId: string;
  metadata: INftInformation;
}>();

const { t } = useI18n({
  messages: {
    en: {
      text: "Mint",
    },
    "zh-CN": {
      text: "铸币",
    },
  },
});

const show = ref(false);
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.btn {
  @include desktop {
    min-width: 360px;
  }
}
</style>
