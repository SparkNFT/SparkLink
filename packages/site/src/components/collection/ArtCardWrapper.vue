<template>
  <ArtCard
    :cover-url="coverUrl ?? t('hint.loading')"
    :title="title ?? `...`"
    :description="description ?? t('hint.loading')"
    :nft-id="nftId"
  ></ArtCard>
</template>

<script lang="ts" setup>
import ArtCard from "./ArtCard.vue";
import {
  INftInformation,
  NftInformationGetter,
} from "@EaseShare/business/generated/src/nftInfomation";
import { computed, onMounted, ref, watch } from "vue";

import { t } from "../../i18n";

const props = defineProps<{
  infoGetter: NftInformationGetter;
  nftId: string;
}>();

const information = ref(null as INftInformation | null);
const coverUrl = computed(() => information.value?.urls.cover);
const title = computed(() => information.value?.name);
const description = computed(() => information.value?.description);

async function reset() {
  information.value = null;
  if (!(props.infoGetter && props.nftId)) return;
  information.value = await props.infoGetter.get(props.nftId);
}

onMounted(reset);
watch(() => [props.infoGetter, props.nftId], reset);
</script>
