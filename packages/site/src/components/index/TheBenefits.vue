<template>
  <section id="benefits" :class="{ 'not-see': !in_the_view }">
    <div class="container">
      <img :src="t('nodes')" class="nodes" />
      <div class="web3">
        <h1 class="title">{{ t("title._1") }}</h1>
        <h1 class="title">{{ t("title._2") }}</h1>

        <p class="text">{{ t("description._1") }}</p>
        <p class="text">{{ t("description._2") }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";

const { t } = useI18n({
  messages: {
    en: {
      nodes: "/assets/how-to-benefit/nodes_en.png",
      title: {
        _1: "For a pure WEB3.0 creator economy,",
        _2: "We are SO different from others",
      },
      description: {
        _1: "Bringing creators and audiences closer than ever before. ",
        _2: "Share and sell node NFTs using a unique tree-shaped sharing economy structure.",
      },
    },
    "zh-CN": {
      nodes: "/assets/how-to-benefit/nodes_zh.png",
      title: {
        _1: "纯粹的Web3.0创作者经济，",
        _2: "我们如此与众不同",
      },
      description: {
        _1: "独特的树形共享经济结构",
        _2: "允许每个人分销内容并向下获取收益",
      },
    },
  },
});

const in_the_view = ref(false);

onMounted(() => {
  let view_point_height = window.innerHeight;
  const element = document.getElementById("benefits");
  if (!element) throw new Error("element is null");
  const element_top_distance = element.offsetTop;

  window.addEventListener("resize", () => {
    view_point_height = window.innerHeight;
  });

  let view_scroll_top = document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    view_scroll_top = document.documentElement.scrollTop;
    if (view_scroll_top + view_point_height > element_top_distance + 400) {
      in_the_view.value = true;
    } else {
      in_the_view.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#benefits {
  height: 863px;
  padding-top: 200px;
  padding-left: 118px;
  padding-right: 118px;
  box-sizing: border-box;
  overflow-x: hidden;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .nodes {
    width: 50%;
    transition: all 0.8s ease-in-out;
  }

  .web3 {
    transition: all 0.8s ease-in-out;

    .title {
      color: #383838;
      font-size: 45px;
      font-style: normal;
      font-weight: 800;
      line-height: 45px;
      text-align: center;
      @include index.title-underline;
    }

    .text {
      color: #8d8d97;
      font-size: 25px;
      font-style: normal;
      font-weight: 400;
      line-height: 25px;
      text-align: center;
    }
  }
}

#benefits.not-see {
  .nodes {
    transform: translateX(-300px);
  }

  .web3 {
    transform: translateX(300px);
  }
}
</style>
