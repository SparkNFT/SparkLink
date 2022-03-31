<template>
  <section id="getting-start" :class="{ mobile: !grid.sm }">
    <div class="getting-start-inner">
      <h2 class="how-to-start">{{ t("title") }}</h2>
      <div class="card-container">
        <GettingStartCard
          v-for="(step, index) in steps"
          :key="index"
          :step="index"
          :icon-url="step.iconUrl"
          :title="step.title"
          :description="step.description"
        ></GettingStartCard>
      </div>
      <div class="btn-container">
        <template v-if="forCreator">
          <el-button
            color="#478EFD"
            class="btn"
            style="color: white"
            @click="forCreator = true"
          >{{ t("button.creator") }}</el-button>
          <el-button class="btn" @click="forCreator = false">{{ t("button.sharer") }}</el-button>
        </template>
        <template v-else>
          <el-button class="btn" @click="forCreator = true">{{ t("button.creator") }}</el-button>
          <el-button
            color="#478EFD"
            class="btn"
            style="color: white"
            @click="forCreator == false"
          >{{ t("button.sharer") }}</el-button>
        </template>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import GettingStartCard from "./GettingStartCard.vue";
import { grid } from "../../grid";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      title: "How to start?",
      steps: [
        {
          title: "Connect Your Wallet",
          description:
            "Connect your wallet and then you can create, share NFTs at Easeshare.",
        },
        {
          title: "Create Your Content in NFTs",
          description:
            "After connecting your wallet, you can create any content by NFTs in Easeshare.",
        },
        {
          title: "Share Your Content To Get Revenues",
          description:
            "After creating your NFTs, you can get revenues by sharing link or poster to anyone.",
        },
      ],
      forSharer: [
        {
          title: "Connect Your Wallet",
          description:
            "Connect your wallet and then you can create, share NFTs at Easeshare.",
        },
        {
          title: "Mint the Content in NFTs",
          description:
            "After connecting your wallet, you can mint any content by NFTs in Easeshare.",
        },
        {
          title: "Share The Node Get Revenues",
          description:
            "After minting your NFTs, you can get node revenues by sharing link or poster to anyone.",
        },
      ],
      button: {
        creator: "For Creators",
        sharer: "For Sharers",
      },
    },
    "zh-CN": {
      title: "如何开始？",
      steps: [
        {
          title: "连接钱包",
          description:
            "连接你的加密钱包，然后就可以在EaseShare创建、分享NFT了。",
        },
        {
          title: "生成作品NFT",
          description:
            "点击发布按钮，以NFT的形式创作自己的作品，作品内容或形式无限制。任何创作者或者分享者可以" +
            "通过分享海报或分享链接将属于自己的节点分享到任何地方，直接或者间接的传播内容。",
        },
        {
          title: "通过分享获得利润",
          description:
            "创作者通过分享和出售自己作品的下级节点永久获取节点收益，分享者通过再次分享和出售已有作品的" +
            "下级节点永久获得抽成收益。当作品的下级节点被出售后，可以直接在作品收藏界面领取收益至个人钱包内。",
        },
      ],
      forSharer: [
        { title: "连接你的钱包", description: "连接您的钱包后，可以在EaseShare创建并分享NFT。" },
        { title: "Mint the node NFTs （铸造节点NFTs）", description: "连接钱包后，您可以在EaseShare寻找并铸造任何你喜欢的NFT内容。" },
        { title: "分享节点获得收入", description: "铸造NFT后，您可以通过分享链接或海报与所有人分享你的节点作品来获得下级节点收入。" }
      ],
      button: {
        creator: "创作者",
        sharer: "分享者",
      },
    },
  },
});

interface IStep {
  iconUrl: string;
  title: string;
  description: string;
}

function createStepMapper(baseUrl: string) {
  return function (
    value: { title: string; description: string },
    index: number
  ) {
    return {
      iconUrl: `${baseUrl}/step-${index + 1}.svg`,
      title: value.title,
      description: value.description,
    } as IStep;
  };
}

const stepSvgBaseUrl = "/assets/getting-start";

const creatorSteps = computed(() => [0, 1, 2]
  .map((i) => ({
    title: t(`steps[${i}].title`),
    description: t(`steps[${i}].description`),
  }))
  .map(createStepMapper(`${stepSvgBaseUrl}/creator`)) as IStep[]);

const sharerSteps = computed(() => [0, 1, 2]
  .map((i) => ({
    title: t(`forSharer[${i}].title`),
    description: t(`forSharer[${i}].description`),
  }))
  .map(createStepMapper(`${stepSvgBaseUrl}/sharer`)) as IStep[]
)
const forCreator = ref(true);

const steps = computed(() => (forCreator.value ? creatorSteps.value : sharerSteps.value));
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#getting-start {
  background-color: var(--grey-background);
  display: flex;
  justify-content: center;
  .getting-start-inner {
    max-width: 1344px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .how-to-start {
      @include index.index-title;
    }
    .card-container {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
    }
    .btn-container {
      margin-top: 100px;
      margin-bottom: 66px;
      .btn {
        border-radius: 8px;
      }
    }
  }
}

.mobile {
  .getting-start-inner {
    .card-container {
      padding: 0 16px;
      flex-direction: column;
      gap: 20px;
      .card + .card {
        margin-left: unset;
      }
    }
  }
}

.btn + .btn {
  margin-left: 40px;
}
</style>
