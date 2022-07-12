<template>
  <Button :type="Type.Outlined" @click="show = true">
    <template #icon>
      <span class="material-icons-outlined">local_fire_department</span>
    </template>
    <span>{{ t("text") }}</span>
  </Button>
  <Poster
    v-model="show"
    :cover="metadata.urls.cover"
    :name="metadata.name"
    :price="metadata.sellingPrice"
    :symbol="token.symbol"
    :logo-url="token.logoURI"
    :chain="chain"
    :payment-currency="metadata.paymentCurrency.address"
    :url="shareLink"
  ></Poster>
</template>

<script lang="ts" setup>
import Button, { Type } from "../Button.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { setupRoute, setupShareLink } from "./data";
import Poster from "./Poster.vue";
import { computed } from "@vue/reactivity";
import { getNftInfo } from "../../store/info";

const props = defineProps<{
  metadata: Awaited<ReturnType<typeof getNftInfo>>;
}>();

const { t } = useI18n({
  messages: {
    en: {
      text: "Poster sharing",
    },
    "zh-CN": {
      text: "分享海报",
    },
  },
});

const token = computed(() => props.metadata.paymentCurrency)

const { chain } = setupRoute();
const { shareLink } = setupShareLink();

const show = ref(false);
</script>
