<template>
  <div v-if="!isCurrentChain" class="hint">
    <el-alert type="error" :closable="false" center class="alert">
      {{ t("hint", [chain, currentChain]) }}
    </el-alert>
  </div>
  <div v-else-if="hasMetadata" class="content">
    <div class="top-area">
      <BackButton class="back"></BackButton>
      <ColorTitle :title="title"></ColorTitle>
    </div>
    <slot></slot>
  </div>
  <el-skeleton v-else :row="5" animated class="skeleton"></el-skeleton>
</template>

<script lang="ts" setup>
import { web3InfoGetter } from "../../store";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { chainIdToName } from "../../token";
import BackButton from "./BackButton.vue";
import ColorTitle from "../ColorTitle.vue";

defineProps<{ title: string, hasMetadata: boolean }>();

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
// From route
const route = useRoute();
const chainId = computed(() => parseInt(route.params.chainId as string));
const chain = computed(() => chainIdToName.get(chainId.value) as string);

const isCurrentChain = computed(
  () => {return chainId.value === web3InfoGetter.chain.id.value || web3InfoGetter.chain.id.value < 0}
);

const currentChain = web3InfoGetter.chain.name;

</script>

<style lang="scss" scoped>
.hint {
  > .alert {
    --el-alert-description-font-size: 14px;
    padding: 12px;
  }
}

.hint,.skeleton {
  padding: 20px;
}

.content {
  padding-top: 145px;
  max-width: 1425px;
  margin: auto;
  display: flex;
  flex-direction: column;
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
