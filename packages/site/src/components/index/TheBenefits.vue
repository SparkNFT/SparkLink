<template>
  <section id="benefits" :class="{ 'not-see': !in_the_view }">
    <div class="wrapper">
      <div class="container">
      <NodesImg v-if="!isMobile"></NodesImg>
      <div class="web3">
        <h1 class="title">
          {{ t("title._1") }}<br v-if="!isMobile" />{{ t("title._2") }}
        </h1>
        <p class="text">
          {{ t("description._1") }}<br v-if="!isMobile" />{{
            t("description._2")
          }}
        </p>
        <NodesImg v-if="isMobile"></NodesImg>
      </div>
    </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref } from "vue";
import { grid } from "../../grid";
import NodesImg from "./benefits/NodesImg.vue";

const { t } = useI18n({
  messages: {
    en: {
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

const isMobile = computed(() => !grid.lg);

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
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

@mixin mobile() {
  @include res("md-and-down", $breakpoints-spec) {
    @content;
  }
}

@mixin desktop() {
  @include res("lg-and-up", $breakpoints-spec) {
    @content;
  }
}

#benefits {
  padding: 200px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #F4EBEB;
  position: relative;
  top: calc(var(--header-height));
  @include mobile {
    padding: 80px 20px 60px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @include mobile {
      flex-direction: column;
    }
  }

  .web3 {
    transition: all 0.8s ease-in-out;

    .title {
      @include index.index-title;
      @include index.title-underline;
      margin-bottom: 56px;
      @include mobile {
        margin-bottom: 32px;
      }
    }

    .text {
      @include index.index-description;
      @include mobile {
        margin-bottom: 50px;
      }
    }
  }
}

.wrapper {
  @include desktop() {
    max-width: 1688px;
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
