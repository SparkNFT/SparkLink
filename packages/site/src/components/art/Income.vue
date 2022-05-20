<template>
  <div class="container">
    <p class="title">{{ t("title") }}</p>
    <p class="result">
      <span class="number">{{ profit }}</span>
      <span class="unit">{{ token.symbol }}</span>
    </p>
    <div class="btn-area">
      <Button class="btn" @click="claim">
        <template #icon>
          <span class="material-icons-outlined">currency_exchange</span>
        </template>
        <span>{{ t("btns.claim") }}</span>
      </Button>
      <Button :type="Type.Disabled" class="btn">
        <template #icon>
          <span class="material-icons-outlined">currency_bitcoin</span>
        </template>
        <span>{{ t("btns.transfer") }}</span>
      </Button>
      <ClaimProfitInProgress
        v-if="claimInProgress"
        v-model="claimInProgress"
        :nft-id="nftId"
      ></ClaimProfitInProgress>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { computed } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { IToken } from "../../token";
import { toCoin } from "./data";
import Button, { Type } from "../Button.vue";
import { ref } from "vue";
import ClaimProfitInProgress from "./ClaimProfitInProgress.vue";

const props = defineProps<{
  nftId: string;
  metadata: INftInformation;
  token: IToken;
}>();

const { t } = useI18n({
  messages: {
    en: {
      title: "Current Earnings",
      btns: {
        claim: "Recieve Income",
        transfer: "Transfer",
      },
    },
    "zh-CN": {
      title: "目前收益",
      btns: {
        claim: "获取收益",
        transfer: "转移",
      },
    },
  },
});

const profit = computed(() => toCoin(props.metadata.profit));

function setupClaim() {
  const claimInProgress = ref(false);

  function claim() {
    claimInProgress.value = true;
  }

  return { claimInProgress, claim };
}

const { claimInProgress, claim } = setupClaim();
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: #777777;
  font-weight: 700;
  font-size: 24px;
}

.result {
  font-weight: bold;
  font-size: 36px;
  .number {
    color: black;
    &:after {
      content: " ";
    }
  }
  .unit {
    color: var(--el-color-primary);
  }
}

.btn-area {
  display: flex;
  width: 100%;
  max-width: 900px;
  gap: 100px;
}

.btn {
  flex: 1;
}

.btn-text {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: auto;
  gap: 18px;
}
</style>
