<template>
  <div v-if="!isCurrentChain" class="hint">
    <el-alert type="error" :closable="false" center class="alert">
      {{ t("hint", [chain, currentChain]) }}
    </el-alert>
  </div>
  <div v-else-if="hasMetadata" class="content">
    <div class="top-area">
      <BackButton v-if="!inMobile" class="back"></BackButton>
      <ColorTitle :title="title"></ColorTitle>
    </div>
    <slot></slot>
  </div>
  <el-skeleton v-else :row="5" animated class="skeleton"></el-skeleton>
</template>

<script lang="ts" setup>
import { web3InfoGetter } from "../../store";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import BackButton from "./BackButton.vue";
import ColorTitle from "../ColorTitle.vue";
import { art } from "../../states";
import { setupRoute } from "./data";

defineProps<{ title: string; hasMetadata: boolean }>();

const { t } = useI18n({
  messages: {
    en: {
      hint: "This nft is on the {0} network. Please switch to it first. (Current: {1})",
    },
    "zh-CN": {
      hint: "当前NFT在 {0} 网络。请先更换到该网络。（当前网络：{1}）",
    },
  },
});

const { inMobile } = art;

const { chainId, chain } = setupRoute();

const isCurrentChain = computed(() => {
  return (
    chainId.value === web3InfoGetter.chain.id.value ||
    web3InfoGetter.chain.id.value < 0
  );
});

const currentChain = web3InfoGetter.chain.name;
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.hint {
  > .alert {
    --el-alert-description-font-size: 14px;
    padding: 12px;
  }
}

.hint,
.skeleton {
  width: 80%;
  margin: 20px;
}

.content {
  padding-top: 145px;
  max-width: 1425px;
  margin: auto;
  display: flex;
  flex-direction: column;
  
  @include mobile {
    padding-top: 78px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.top-area {
  display: flex;
  justify-content: center;
  position: relative;
  .back {
    position: absolute;
    left: 0;
  }
}
</style>
