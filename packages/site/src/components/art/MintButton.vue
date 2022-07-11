<template>
  <Button :type="type" class="btn" @click="show = true">
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
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { web3InfoGetter } from "../../store";
import Button, { Type } from "../Button.vue";
import MintInProgress from "./MintInProgress.vue";
import { NftInformation } from "./types";

defineProps<{
  nftId: string;
  metadata: NftInformation;
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

const type = computed(() => web3InfoGetter.account.value   ? Type.Default : Type.Disabled);
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.btn {
  @include desktop {
    min-width: 360px;
  }
}
</style>
