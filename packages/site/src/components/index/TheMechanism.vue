<template>
  <section id="mechanism" :class="{ 'not-see': !in_the_view }">
    <div class="container">
      <div class="description">
        <h2 class="how-we-work">
          {{ t("title._1") }}<br v-if="!grid.md" />{{ t("title._2") }}
        </h2>
        <p class="sub-title">
          {{ t("description._1") }}<br v-if="grid.md" />
          {{ t("description._2") }}
        </p>
        <button
          id="home-start-publish"
          class="start-to-publish"
          @click="router.push({ name: 'publish' })"
        >
          {{ t("start_to_publish") }}
        </button>
      </div>
      <Cases></Cases>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Cases from "./mechanism/Cases.vue";
import { grid } from "../../grid";

const { t } = useI18n({
  messages: {
    en: {
      title: {
        _1: "Publishing without limits",
        _2: "",
      },
      description: {
        _1: "No restrictions on format or content of. ",
        _2: "Everything is stored permanently and distributed in NFT.",
      },
      start_to_publish: "Start publish",
    },
    "zh-CN": {
      title: {
        _1: "自由发布您",
        _2: "喜欢的内容",
      },
      description: {
        _1: "对出版物的格式没有限制，",
        _2: "所有内容都永久存储在NFT中",
      },
      start_to_publish: "开始发布",
    },
  },
});

const router = useRouter();
const in_the_view = ref(false);

onMounted(() => {
  let view_point_height = window.innerHeight;
  const element = document.getElementById("mechanism");
  if (!element) throw new Error("element is null");
  const element_top_distance = element.offsetTop;

  window.addEventListener("resize", () => {
    view_point_height = window.innerHeight;
  });

  let view_scroll_top = document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    view_scroll_top = document.documentElement.scrollTop;
    if (view_scroll_top + view_point_height > element_top_distance + 600) {
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

#mechanism {
  width: 100%;
  padding-top: 115px;
  padding-bottom: 150px;
  box-sizing: border-box;

  @include res("sm-and-down", $breakpoints-spec) {
    padding-top: 80px;
    padding-bottom: 65px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include res("sm-and-down", $breakpoints-spec) {
      flex-direction: column;
    }
    @include index.index-container;
  }

  .description,
  .types {
    height: 100%;
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include res("lg-and-up", $breakpoints-spec) {
      width: 60%;
    }

    .how-we-work {
      @include index.index-title;
      margin: 0 0 52px;
      @include res("sm-and-down", $breakpoints-spec) {
        margin-bottom: 32px;
      }
    }

    .sub-title {
      @include index.index-description;
      margin-bottom: 84px;
      @include res("sm-and-down", $breakpoints-spec) {
        margin-bottom: 46px;
      }
    }
  }

  .start-to-publish {
    width: 319px;
    height: 82px;
    color: #ef7a61;
    border: 1px solid #ef7a61;
    border-radius: 15px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    background-color: white;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    @include res("sm-and-down", $breakpoints-spec) {
      height: 56px;
      font-size: var(--el-font-size-extra-large);
      width: unset;
      padding: 0 28px;
      margin-bottom: 90px;
    }

    &:hover {
      color: white;
      background-color: #ef7a61;
    }
  }
}

#mechanism.not-see {
  .start-to-publish {
    transform: translateY(100px);
  }
}
</style>
