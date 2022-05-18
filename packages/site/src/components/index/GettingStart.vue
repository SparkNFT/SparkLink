<template>
  <section id="getting-start" :class="{ 'not-see': !in_the_view }">
    <div class="getting-start-inner">
      <h2 class="how-to-start">{{ t("title") }}</h2>
      <h5 class="sub-title">
        {{ t("description") }}
      </h5>
      <div id="home-start-card-container" class="card-container">
        <div v-for="(step, index) in steps" :key="index" class="card-wrapper">
          <el-image
            v-if="index === 0 && grid.xl"
            src="/assets/home/block_1.svg"
            class="dot"
          ></el-image>
          <GettingStartCard
            :icon-url="step.iconUrl"
            :title="step.title"
            :description="step.description"
            :the-class="step.class"
          ></GettingStartCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import GettingStartCard from "./GettingStartCard.vue";
import { useI18n } from "vue-i18n";
import { grid } from "../../grid";

const { t } = useI18n({
  messages: {
    en: {
      title: "Get started",
      description:
        "No gatekeepers. You’re in control. Publish and share in seconds.",
      steps: [
        {
          title: "Set up wallet",
          description: "Connect a crypto wallet to start.",
        },
        {
          title: "Publish content",
          description: "Upload your work (image, video, audio, or 3D art).",
        },
        {
          title: "Generate sharing poster or link",
          description:
            "Generate an exclusive sharing poster or link of your NFT to share and sell freely.",
        },
        {
          title: "Monetize",
          description:
            "Creators gain royalties and node income by selling subordinate nodes of their works. Sharers gain income by selling subordinate nodes of creator’s NFTs.",
        },
      ],
    },
    "zh-CN": {
      title: "如何开始",
      description: "无需中间商，创造和分发即刻开始",
      steps: [
        {
          title: "设置您的数字钱包",
          description: "连接加密钱包开始",
        },
        {
          title: "发布您的作品",
          description: "上传您任何格式的作品（图像、视频、音频等）",
        },
        {
          title: "生成分享海报或链接",
          description: "生成作品的独特分享海报和链接，自由分享和销售",
        },
        {
          title: "获取收益",
          description:
            "创作者通过出售自己作品的从属节点永久获得版税和节点抽成收入，共享者通过分销已购买作品的下级永久获得抽成收入。",
        },
      ],
    },
  },
});

interface IStep {
  iconUrl: string;
  title: string;
  description: string;
  class: string;
}

function createStepMapper(baseUrl: string) {
  return function (
    value: { title: string; description: string; class: string },
    index: number
  ) {
    return {
      iconUrl: `${baseUrl}/step-${index + 1}.png`,
      title: value.title,
      description: value.description,
      class: value.class,
    } as IStep;
  };
}

const stepSvgBaseUrl = "assets/getting-start";

const step_class = ["_1", "_2", "_3", "_4"];

const steps = computed(
  () =>
    [0, 1, 2, 3]
      .map((i) => ({
        title: t(`steps[${i}].title`),
        description: t(`steps[${i}].description`),
        class: step_class[i],
      }))
      .map(createStepMapper(`${stepSvgBaseUrl}`)) as IStep[]
);

const in_the_view = ref(false);

onMounted(() => {
  let view_point_height = window.innerHeight;
  const element = document.getElementById("getting-start");
  if (!element) throw new Error("element is null");
  const element_top_distance = element.offsetTop;

  window.addEventListener("resize", () => {
    view_point_height = window.innerHeight;
  });

  let view_scroll_top = document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    view_scroll_top = document.documentElement.scrollTop;
    if (view_scroll_top + view_point_height > element_top_distance + 300) {
      in_the_view.value = true;
    } else {
      in_the_view.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

.dot {
  position: absolute;
  right: 0;
  transform: translate(23.5%, -40%);
  width: 310px;
  z-index: -1;
}

#getting-start {
  box-sizing: border-box;
  text-align: center;

  @include res("lg-and-down", $breakpoints-spec) {
    padding: 100px 0;
  }

  @include res("xl-only", $breakpoints-spec) {
    padding: 166px 0;
  }

  @include res("sm-and-down", $breakpoints-spec) {
    padding: 78px 0;
  }

  @include res("md-and-down", $breakpoints-spec) {
    background-color: #f9f4f4;
  }

  .getting-start-inner {
    .how-to-start {
      @include index.index-title;
    }

    .sub-title {
      @include index.index-description;
    }

    .card-container {
      margin: 0 auto;
      max-width: 1683px;
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      gap: 30px;

      @include res("lg-and-down", $breakpoints-spec) {
        margin-top: 80px;
      }
      @include res("xl-only", $breakpoints-spec) {
        margin-top: 120px;
      }

      @include res("md-and-down", $breakpoints-spec) {
        flex-direction: column;
      }
      @include res("xs-only", $breakpoints-spec) {
        margin-top: 48px;
      }
      @include index.index-container;
    }
  }
}

:deep(._1) {
  transition: all 0.5s ease-in-out;
}

:deep(._2) {
  transition: all 1s ease-in-out;
}

:deep(._3) {
  transition: all 1.5s ease-in-out;
}

:deep(._4) {
  transition: all 2s ease-in-out;
}

.card-wrapper {
  flex: 1;
  display: flex;
  align-items: stretch;
  position: relative;
}

.not-see {
  :deep(.card) {
    transform: translateY(550px);
    opacity: 0;
  }
}
</style>
