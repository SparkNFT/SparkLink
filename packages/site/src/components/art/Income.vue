<template>
  <div class="container">
    <p class="title">{{ t("title") }}</p>
    <p class="result">
      <span class="number">{{ profit }}</span>
      <span class="unit">{{ metadata.paymentCurrency.symbol }}</span>
    </p>
    <div class="btn-area">
      <Button
        class="btn"
        :type="type"
        @click="claim"
      >
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
import { computed } from "@vue/reactivity";
import { useI18n } from "vue-i18n";
import { toCoin } from "./data";
import Button, { Type } from "../Button.vue";
import { ref } from "vue";
import ClaimProfitInProgress from "./ClaimProfitInProgress.vue";
import { art } from "../../states";
import { NftInformation } from "./types";
import { web3InfoGetter } from "../../store";

const props = defineProps<{
  nftId: string;
  metadata: NftInformation;
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

const { inMobile } = art;

const profit = computed(() => toCoin(props.metadata.profit));

function setupClaim() {
  const claimInProgress = ref(false);

  function claim() {
    claimInProgress.value = true;
  }

  return { claimInProgress, claim };
}

const { claimInProgress, claim } = setupClaim();

const type = computed(() =>
  web3InfoGetter.account.value
    ? inMobile.value
      ? Type.Outlined
      : Type.Default
    : Type.Disabled
);
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

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
  position: relative;
  .number {
    color: black;
    &:after {
      content: " ";
    }
  }
  .unit {
    color: var(--el-color-primary);
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 116px;
    overflow: visible;
    height: 110px;
    background: linear-gradient(
      180deg,
      rgba(255, 234, 7, 0.7) -16.85%,
      rgba(255, 234, 7, 0) 42.93%
    );
    justify-content: end;
    filter: drop-shadow(0px 3px 40px rgba(255, 245, 135, 0.25));
    border-radius: 52.5px;
    .number {
      font-size: 42px;
    }
    .unit {
      font-size: 24px;
      font-weight: 800px;
    }
    .background {
      position: absolute;
      top: 0;
    }
  }
}

.btn-area {
  display: flex;
  width: 100%;
  max-width: 900px;
  gap: 100px;
  :deep(* + *) {
    margin-left: unset;
  }

  @include mobile {
    flex-direction: column;
    gap: 22px;
    width: 80%;
  }
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
