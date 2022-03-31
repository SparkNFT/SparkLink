<template>
  <div v-if="!isCurrentChain" style="margin-top: 40px">
    <el-alert type="error" dark>
      {{ t("hint", [chain, web3InfoGetter.chain.name]) }}
    </el-alert>
  </div>
  <template v-else-if="metadata">
    <div v-if="grid.md" class="art-container">
      <el-row>
        <el-col :span="8" style="padding-right: 12px">
          <Cover :url="cover" class="area"></Cover>
          <Operations
            :metadata="metadata as INftInformation"
            :nft-id="nftId"
            class="area"
          ></Operations>
        </el-col>
        <el-col :span="16" style="padding-left: 12px">
          <el-card shadow="never" class="description-area">
            <div class="top">
              <el-button type="text" class="nftId">#{{ nftId }}</el-button>
            </div>
            <Title>{{ metadata.name }}</Title>
            <p class="description">{{ metadata.description }}</p>
            <MetaCard :infomation="metadata as INftInformation" :symbol="token.symbol"></MetaCard>
            <div class="share-area">
              <el-button @click="copyLink">{{ t("share.link") }}</el-button>
              <el-button type="primary" @click="showPoster = true">{{
                t("share.poster")
              }}</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="art-container mobile">
      <Cover :url="cover" style="width: 100%"></Cover>
      <h2>{{ metadata.name }}</h2>
      <p class="description">{{ metadata.description }}</p>
      <el-divider></el-divider>
      <MetaCard :infomation="metadata as INftInformation" :symbol="token.symbol"></MetaCard>
      <el-divider></el-divider>
      <el-button
        type="primary"
        style="margin: 0 20px"
        @click="showShareDialog = true"
        >{{t("share.all")}}</el-button
      >
      <Operations
        :metadata="metadata as INftInformation"
        :nft-id="nftId"
      ></Operations>
      <Dialog v-model="showShareDialog">
        <template #mobile>
          <el-button @click="copyLink">{{t("share.link")}}</el-button>
          <el-button type="primary" @click="showPoster = true">{{
            t("share.poster")
          }}</el-button>
        </template>
      </Dialog>
    </div>
    <Poster
      v-model="showPoster"
      :cover="metadata.urls.cover"
      :name="metadata.name"
      :price="metadata.sellingPrice"
      :symbol="token.symbol"
      :logo-url="token.logoURI"
      :chain="chain"
      :payment-currency="metadata.paymentCurrency.value"
      :url="shareLink"
    ></Poster>
  </template>
  <el-skeleton v-else :rows="5" animated style="margin-top: 40px" />
</template>

<script lang="ts" setup>
import { grid } from "../grid";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Title from "../components/Title.vue";
import { useStore } from "vuex";
import { UserOperatorFactory, DownloadEventEmitter } from "@EaseShare/business";
import type { INftInformation } from "@EaseShare/business/generated/src/nftInfomation";
import MetaCard from "../components/art/MetaCard.vue";
import type { IContentDownloader } from "@EaseShare/business/generated/src/downloader";
import Operations from "../components/art/Operations.vue";
import Cover from "../components/art/Cover.vue";
import Dialog from "../components/Dialog.vue";
import Poster from "../components/art/Poster.vue";
import { ElMessage } from "element-plus";
import { web3InfoGetter } from "../store";
import { chainIdToName, IToken } from "../token";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      hint: "This nft is on the {0} network. Please switch to it first. (Current: {1})",
      share: {
        all: "Share",
        link: "Share by link",
        poster: "Share by poster",
      },
      copyLink: {
        hint: "The link has been copyed to your clipboard.",
        prefix: "Welcome to EaseShare to view and share my NFTs: ",
      }
    },
    "zh-CN": {
      hint: "当前NFT在 {0} 网络。请先更换到该网络。（当前网络：{1}）",
      share: {
        all: "分享",
        link: "复制链接",
        poster: "分享海报",
      },
      copyLink: {
        hint: "链接已被复制到剪切板。",
        prefix: "欢迎来到EaseShare查看并分享我的NFT作品："
      }
    },
  },
});

const store = useStore();
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
const infoGetter = computed(() => factory.value?.nftInformationGetter);
const route = useRoute();
const chainId = computed(() => parseInt(route.params.chainId as string));
const chain = computed(() => chainIdToName.get(chainId.value) as string);
const isCurrentChain = computed(
  () => chainId.value === web3InfoGetter.chain.id.value
);
const nftId = computed(() => route.params.nftId as string);
const metadata = ref(null as INftInformation | null);
const cover = computed(() => (metadata.value as INftInformation)?.urls.cover);
async function resetPage() {
  metadata.value = null;
  if (nftId.value && infoGetter.value) {
    metadata.value = await infoGetter.value.get(nftId.value);
  }
}
watch([nftId, infoGetter], resetPage);
onMounted(resetPage);

watch(metadata, () => console.log(metadata.value));

const tokenAddress = computed(() => metadata.value?.paymentCurrency.value);
const tokenInquirer = web3InfoGetter.tokenInquirer;
const token = ref({symbol: "Unknown"} as IToken);

async function setToken() {
if (tokenAddress.value && tokenInquirer.value) {
    token.value = await tokenInquirer.value.query(tokenAddress.value) as IToken;
  }
}

watch([tokenAddress, tokenInquirer], setToken);
onMounted(setToken);

const baseUrl = computed(() => store.state.config.frontendBaseUrl);
const shareLink = computed(() => `${baseUrl.value}/#${route.fullPath}`);

function copyLink() {
  const clipboard = navigator.clipboard;
  clipboard.writeText(`${t("copyLink.prefix")}${shareLink.value}`);
  ElMessage({
    type: "success",
    message: t("copyLink.hint"),
  });
  showShareDialog.value = false;
}

const canDownload = computed(() => !!factory.value && !!metadata.value);
const eventEmitter = ref(null as DownloadEventEmitter | null);
const downloader = ref(null as IContentDownloader | null);
const encrypted = computed(() => metadata.value?.encrypted ?? false);
const downloadInProcess = ref(false);

function setDownloader(
  emitter: DownloadEventEmitter,
  _downloader: IContentDownloader
) {
  eventEmitter.value = emitter;
  downloader.value = _downloader;
  downloadInProcess.value = true;
}

function resetDownloader() {
  eventEmitter.value = null;
  downloader.value = null;
}

watch(downloadInProcess, (a1, a2) => {
  if (!downloadInProcess.value) {
    resetDownloader();
  }
});

async function clickDownloadButton() {
  const _meta = metadata.value as INftInformation;
  if (!canDownload.value) return;
  const downloader = await factory.value.getContentDownloader(
    encrypted.value,
    nftId.value
  );
  const eventEmitter = new DownloadEventEmitter();
  setDownloader(eventEmitter, downloader);
}

const showShareDialog = ref(false);
const showPoster = ref(false);
</script>

<style lang="scss" scoped>
.art-container {
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;

  &.mobile {
    align-items: stretch;
    h2,
    p {
      text-align: center;
    }
    .description {
      margin-block-start: unset;
    }
  }

  .description-area {
    border: unset;
    & > :deep(.el-card__body) {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      padding: unset;
    }

    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: -16px;
      .nftId {
        font-weight: bold;
      }
    }
  }

  .description {
    margin-top: 12px;
    margin-bottom: 12px;

    color: var(--el-color-info);
  }
}

.area + .area {
  margin-top: 16px;
}

.share-area {
  display: flex;
  justify-content: end;
}

.mobile {
  .share-area {
    flex-direction: column;
    gap: 16px;
    :deep(.el-button + .el-button) {
      margin-left: unset;
    }
  }
}
</style>
