<template>
  <el-button class="operator-btn" type="primary" @click="mint">
    {{ t("mint") }}
  </el-button>
  <MintInProgress
    v-if="mintInProgress"
    v-model="mintInProgress"
    :metadata="metadata"
    :nft-id="nftId"
  ></MintInProgress>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import {ref} from "vue";
import MintInProgress from "./MintInProgress.vue";

const { t } = useI18n({
  messages: {
    en: {
      mint: "Mint",
    },
    "zh-CN": {
      mint: "铸币",
    },
  },
});

const props = defineProps<{
  metadata: INftInformation;
  nftId: string;
}>();
const mintInProgress = ref(false);
async function mint() {
  mintInProgress.value = true;
}
</script>

<style scoped lang="scss">
.operator-btn {
  width: 331px;
  --el-font-size-medium: 24px;
  font-weight: 700;
  height: 70px;
  border-radius: 16px;
}
</style>