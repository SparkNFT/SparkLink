<template>
  <Framework
    :title="t(`title.${isArtPage ? 'art' : 'spark'}`)"
    :has-metadata="!!metadata"
  >
    <Income
      v-if="isArtPage"
      :nft-id="nftId"
      :metadata="$metadata"
      :token="token"
      class="income"
    ></Income>
    <div class="art">
      <div
        :class="{ 'col-1': true, 'art-page': isArtPage, spark: isSparkPage }"
      >
        <Cover :url="(metadata?.urls.cover as string)"></Cover>
        <div v-if="isSparkPage" class="text">
          <Title :metadata="$metadata"></Title>
          <p class="description">{{ $metadata.description }}</p>
        </div>
        <DownloadButton
          :nft-id="nftId"
          :metadata="$metadata"
          :outlined="isSparkPage"
        ></DownloadButton>
      </div>
      <div class="col-2">
        <NftId :nft-id="nftId" class="nft-id"></NftId>
        <Title v-if="isArtPage" :metadata="$metadata"></Title>
        <Details :metadata="$metadata" :token="token" class="details"></Details>
        <template v-if="isArtPage">
          <div class="share-btn-area">
            <LinkShareButton></LinkShareButton>
            <PosterShareButton
              :metadata="$metadata"
              :token="token"
            ></PosterShareButton>
          </div>
          <p class="hint">
            💡Everyone can view and purchase this work by sharing links or
            posters to the details page of the work.
          </p>
        </template>
        <div v-else class="mint">
          <MintButton :metadata="$metadata" :nft-id="nftId"></MintButton>
        </div>
      </div>
    </div>
  </Framework>
</template>

<script lang="ts">
export enum Type {
  Art,
  Spark,
}
</script>

<script lang="ts" setup>
import Framework from "../components/art/Framework.vue";
import Income from "../components/art/Income.vue";
import Cover from "../components/art/Cover.vue";
import { useI18n } from "vue-i18n";
import { setup } from "../components/art/data";
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import DownloadButton from "../components/art/DownloadButton.vue";
import NftId from "../components/art/NftId.vue";
import Title from "../components/art/Title.vue";
import Details from "../components/art/Details.vue";
import LinkShareButton from "../components/art/LinkShareButton.vue";
import PosterShareButton from "../components/art/PosterShareButton.vue";
import { computed } from "vue";
import MintButton from "../components/art/MintButton.vue";

//workaround
type _workaround = INftInformation;

const props = defineProps<{ type: Type }>();

const { t } = useI18n({
  messages: {
    en: {
      title: { art: "Collection", spark: "Spark Information" },
    },
    "zh-CN": {
      title: { art: "收藏" },
    },
  },
});

const { nftId, metadata, token } = setup();
const $metadata = computed(() => metadata.value as INftInformation);

const isArtPage = computed(() => props.type === Type.Art);
const isSparkPage = computed(() => !isArtPage.value);
</script>

<style lang="scss" scoped>
.income {
  margin-top: 92px;
}

.art {
  margin-top: 113px;
  display: flex;
  gap: 120px;
  margin-bottom: 180px;
}

.col-1,
.col-2 {
  display: flex;
  flex-direction: column;
}

.col-1 {
  &.art-page {
    align-items: center;
    gap: 72px;
  }

  &.spark {
    align-items: flex-end;
    gap: 50px;
    .text {
      text-align: right;
    }
  }
}

.col-2 {
  flex: 1;
}

.nft-id {
  margin-bottom: 12px;
}

.details {
  margin-top: 120px;
}

.share-btn-area {
  margin-top: 100px;
  display: flex;
  gap: 27px;
  > * {
    flex: 1;
  }
}

.hint {
  margin-top: 27px;
  font-size: var(--el-font-size-small);
}

.description {
  font-size: 24px;
  color: #8d8d97;
}

.mint {
  margin-top: 212px;
}
</style>
