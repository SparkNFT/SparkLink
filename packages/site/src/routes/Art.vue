<template>
  <Framework
    :title="t(`title.${isArtPage ? 'art' : 'spark'}`)"
    :has-metadata="!!metadata"
  >
    <Income
      v-if="isArtPage && account"
      :nft-id="nftId"
      :metadata="$metadata"
      :token="$metadata.paymentCurrency"
      class="income"
    ></Income>
    <div class="art">
      <div
        :class="{ 'col-1': true, 'art-page': isArtPage, spark: isSparkPage }"
      >
        <Cover :url="(metadata?.urls.cover as string)" class="cover"></Cover>
        <div v-if="inMobile" class="name-area">
          <NftId :nft-id="nftId" class="nft-id"></NftId>
          <Title :metadata="$metadata" class="title"></Title>
        </div>
        <div v-else-if="isSparkPage" class="text">
          <Title :metadata="$metadata"></Title>
          <p class="description">{{ $metadata.description }}</p>
        </div>
        <DownloadButton
          v-if="!(isSparkPage && inMobile)"
          :nft-id="nftId"
          :metadata="$metadata"
          :outlined="isSparkPage"
        ></DownloadButton>
      </div>
      <div class="col-2">
        <template v-if="!inMobile">
          <NftId :nft-id="nftId" class="nft-id"></NftId>
          <Title v-if="isArtPage" :metadata="$metadata"></Title>
        </template>
        <Details :metadata="$metadata" class="details"></Details>
        <template v-if="isArtPage">
          <div class="share-btn-area">
            <LinkShareButton></LinkShareButton>
            <PosterShareButton
              :metadata="$metadata"
            ></PosterShareButton>
          </div>
          <p class="hint">
            💡Everyone can view and purchase this work by sharing links or
            posters to the details page of the work.
          </p>
        </template>
        <div v-else class="mint">
          <DownloadButton
            v-if="isSparkPage && inMobile"
            :nft-id="nftId"
            :metadata="$metadata"
            :outlined="isSparkPage"
          ></DownloadButton>
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
import { art } from "../states";
import { getNftInfo } from "../store/info";
import { web3InfoGetter } from "../store";

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

const { inMobile } = art;

const account = web3InfoGetter.account;
const { nftId, metadata } = setup();
const $metadata = computed(() => metadata.value as Awaited<ReturnType<typeof getNftInfo>>);

const isArtPage = computed(() => props.type === Type.Art);
const isSparkPage = computed(() => !isArtPage.value);
</script>

<style lang="scss" scoped>
@use "../styles/art.scss" as *;

.income {
  margin-top: 92px;
  @include mobile {
    margin-top: 60px;
  }
}

.art {
  margin-top: 113px;
  display: flex;
  margin-bottom: 180px;

  @include desktop {
    gap: 120px;
  }

  @include mobile {
    flex-direction: column;
    margin-top: 63px;
  }
}

.col-1,
.col-2 {
  display: flex;
  flex-direction: column;
}

.col-1 {
  align-items: center;
  &.art-page {
    @include desktop {
      gap: 72px;
    }
  }

  &.spark {
    @include desktop {
      gap: 50px;
      align-items: flex-end;
      .text {
        text-align: right;
      }
    }
  }

  @include mobile {
    gap: 36px;
    .cover {
      width: 100%;
    }
  }
}

.name-area {
  text-align: center;
}

.col-2 {
  flex: 1;
}

.nft-id {
  margin-bottom: 12px;
}

.details {
  margin-top: 120px;

  @include mobile {
    margin-top: 46px;
  }
}

.share-btn-area {
  margin-top: 100px;
  display: flex;
  gap: 27px;
  > * {
    flex: 1;
  }

  @include mobile {
    margin-top: 60px;
    flex-direction: column;
    align-items: center;
  }
}

.hint {
  margin-top: 27px;
  font-size: var(--el-font-size-small);
  @include mobile {
    padding: 0 20px;
    line-height: 1.5;
    font-size: var(--el-font-size-medium);
    color: var(--el-color-info);
    text-align: center;
  }
}

.description {
  font-size: 24px;
  color: #8d8d97;
}

.mint {
  margin-top: 212px;
  @include mobile {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }
}

.share-btn-area, .mint {
  @include buttonContainer;
}
</style>
