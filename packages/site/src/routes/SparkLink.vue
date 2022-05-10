<template>
  <div v-if="!isCurrentChain" style="margin-top: 40px">
    <el-alert type="error" dark>
      {{ t("hint", [chain, web3InfoGetter.chain.name.value]) }}
    </el-alert>
  </div>
  <template v-else-if="metadata">
    <div class="art-detail">
      <div>
        <img
          src="/assets/art/expand-left.png"
          class="back-to-collection"
          @click="router.push({ name: 'collection' })"
        />
        <h2 class="title">{{ t("title") }}</h2>
      </div>
      <div class="detail-container">
        <div class="exhibition">
          <div class="cover-container">
            <img :src="metadata.urls.cover" />
          </div>
          <div>
            <h2 class="nft-name">{{ metadata.name }}</h2>
            <p class="description">{{ metadata.description }}</p>
          </div>
          <art-download
            :metadata="metadata"
            :nft-id="nftId"
          />
        </div>
        <div class="info">
          <p class="nft-id">#{{ nftId }}</p>
          <div class="nft-detail">
            <div class="detail-item">
              <p>
                {{ t("detail.price") }}
              </p>
              <p class="result">
                {{ `${sellingPriceInCoin} ${token.symbol}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.royalty") }}
              </p>
              <p class="result">
                {{ `${toCoin(metadata.royaltyPrice)} ${token.symbol}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.max_shares_number") }}
              </p>
              <p class="result">
                {{ `${metadata.maxShareTimes}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.remaining_share_times") }}
              </p>
              <p class="result">
                {{ `${metadata.remainShareTimes}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.percentage_earning") }}
              </p>
              <p class="result">
                {{ `${metadata.percentageOfEarnings}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.work_is_encrypted") }}
              </p>
              <p class="result">
                {{ `${metadata.encrypted === "true" ? "Yes" : "No"}` }}
              </p>
            </div>
            <div class="detail-item">
              <p>
                {{ t("detail.allow_secondary_creation") }}
              </p>
              <p class="result">
                {{
                  `${metadata.allowSecondaryCreation === "true" ? "Yes" : "No"}`
                }}
              </p>
            </div>
          </div>
          <art-mint
            :metadata="metadata"
            :nft-id="nftId"
          />
        </div>
      </div>
    </div>
  </template>
  <el-skeleton v-else :rows="5" animated style="margin-top: 40px" />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { web3InfoGetter } from "../store";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { chainIdToName, IToken } from "../token";
import { UserOperatorFactory } from "@SparkLink/business";
import type { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { useStore } from "vuex";
import Web3 from "web3";
import ArtMint from "../components/art/ArtMint.vue";
import ArtDownload from "../components/art/ArtDownload.vue";

const { t } = useI18n({
  messages: {
    en: {
      title: "Spark Information",
      hint: "This nft is on the {0} network. Please switch to it first. (Current: {1})",
      detail: {
        price: "Spark Price:",
        royalty: "Fixed royalty for root:",
        max_shares_number: "Maximum number of share:",
        remaining_share_times: "Remaining share times:",
        percentage_earning: "Percentage of Earning on sub-node:",
        work_is_encrypted: "Work is encrypted:",
        allow_secondary_creation: "Allow secondary creation:",
      },
    },
    "zh-CN": {
      title: "Spark Information",
      hint: "当前NFT在 {0} 网络。请先更换到该网络。（当前网络：{1}）",
			detail: {
				price: "点火价格:",
				royalty: "根节点固定版税抽成：",
				max_shares_number: "最大分销次数：",
				remaining_share_times: "剩余分享次数：",
				percentage_earning: "子节点抽成：",
				work_is_encrypted: "NFT内容是否加密：",
				allow_secondary_creation: "是否允许二次创作：",
			},
		},
	},
});

const route = useRoute();
const router = useRouter();
const store = useStore();
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const infoGetter = computed(() => factory.value?.nftInformationGetter);
const nftId = computed(() => route.params.nftId as string);
const chainId = computed(() => parseInt(route.params.chainId as string));
const chain = computed(() => chainIdToName.get(chainId.value) as string);
const isCurrentChain = computed(
  () => chainId.value === web3InfoGetter.chain.id.value
);
const metadata = ref(null as INftInformation | null);
const token = ref({ symbol: "Unknown" } as IToken);
const tokenAddress = computed(() => metadata.value?.paymentCurrency.value);
const tokenInquirer = web3InfoGetter.tokenInquirer;

async function setToken() {
  if (tokenAddress.value && tokenInquirer.value) {
    token.value = (await tokenInquirer.value.query(
      tokenAddress.value
    )) as IToken;
  }
}

watch([tokenAddress, tokenInquirer], setToken);
onMounted(setToken);

const toCoin = function (wei: BigInt) {
  const web3 = store.state.web3.web3 as Web3;
  return web3.utils.fromWei(wei.toString());
};
const sellingPriceInCoin = computed(() =>
  toCoin((metadata.value as INftInformation)?.sellingPrice)
);

async function resetPage() {
  metadata.value = null;
  if (nftId.value && infoGetter.value) {
    metadata.value = await infoGetter.value.get(nftId.value);
  }
}

watch([nftId, infoGetter], resetPage);
onMounted(resetPage);
</script>
<style scoped lang="scss">
.art-detail {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  padding: 142px 0 175px 0;

  .back-to-collection {
    width: 73px;
    position: absolute;
    top: 130px;
    left: 228px;
    cursor: pointer;
  }

  .title {
    margin: 0;
    font-size: 48px;
    font-weight: 900;
    line-height: 48px;
    text-align: center;
  }

  .detail-container {
    max-width: 1342px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 113px auto 0 auto;

    .exhibition {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      max-width: 525px;
      height: 837px;
      text-align: right;

      .cover-container {
        width: 100%;
        height: 525px;
        display: flex;
        align-items: center;

        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
      }

      .nft-name {
        font-weight: 800;
        font-size: 36px;
        line-height: 44px;
        margin-bottom: 12px;
      }

      .description {
        color: #8d8d97;
        font-weight: 400;
        font-size: 25px;
        line-height: 140%;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 673px;
      height: 837px;
      flex: 1;
      text-align: left;

      .nft-id {
        margin: 0;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: #ef7a61;
      }

      .nft-detail {
        margin: 106px 0;

        p {
          margin: 0;
          font-style: normal;
          font-weight: 600;
          font-size: 30px;
          line-height: 100%;
          color: #303030;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;

          .result {
            color: #ef7a61;
            font-weight: 700;
            font-size: 30px;
          }
        }

        .detail-item + .detail-item {
          margin-top: 29px;
        }
      }
    }
  }
}
</style>
