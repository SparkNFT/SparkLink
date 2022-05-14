<template>
  <div class="wrapper">
    <div class="icon-wrapper">
      <div class="cases-container">
        <div v-for="$case in cases" :key="$case.description" class="item">
          <img :src="`/assets/mechanism/${$case.icon}.png`" class="icon" />
          <p class="description">{{ $case.description }}</p>
        </div>
      </div>
      <div class="img">
        <img
          :src="`/assets/mechanism/dots${
            index.blocksHaveBackground.value ? '' : '-grey'
          }.svg`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { index } from "../../../states";

const { t } = useI18n({
  messages: {
    en: {
      artWorks: "Art Works",
      illustration: "Illustration",
      books: "Books",
      nature: "Nature",
      "3dArt": "3D Art",
      "3dModeling": "3D Modeling",
      music: "Music",
      discovery: "Discovery",
      animation: "Animation",
    },
    "zh-CN": {
      artWorks: "艺术作品",
      illustration: "插图",
      books: "书",
      nature: "自然界",
      "3dArt": "3D 艺术",
      "3dModeling": "3D 建模",
      music: "音乐",
      discovery: "发现",
      animation: "动画",
    },
  },
});

interface ICase {
  icon: string;
  description: string;
}

// todo: check whether we need computed.
// const cases = computed(
const cases = computed(
  () =>
    [
      { icon: "file", description: t("artWorks") },
      { icon: "edit-pencil-line", description: t("illustration") },
      { icon: "book-open", description: t("books") },
      { icon: "leaf", description: t("nature") },
      { icon: "command", description: t("3dArt") },
      { icon: "building", description: t("3dModeling") },
      { icon: "head-phones", description: t("music") },
      { icon: "camera", description: t("discovery") },
      { icon: "alt", description: t("animation") },
    ] as ICase[]
);
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

.wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  margin-right: 200px;
  @include res("md-and-down", $breakpoints-spec) {
    margin-right: unset;
  }
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  gap: 54px;
}

.cases-container {
  display: grid;
  grid-template-columns: repeat(3, var(--cases-card-len));
  grid-template-rows: repeat(3, var(--cases-card-len));
  column-gap: 137px;
  row-gap: 42px;
  --cases-card-len: 110px;

  @include res("md-and-down", $breakpoints-spec) {
    column-gap: 35px;
    row-gap: 35px;
    --cases-card-len: 92px;
  }
}

.item {
  border-radius: 10px;
  box-shadow: 0 2px 20px 0 #ef7a6140;
  padding: 14px 0 17px;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.5s;

  &:hover {
    background: #ffffff;
    box-shadow: 0 3px 40px rgba(232, 68, 33, 0.55);
  }

  .icon {
    width: 46px;
    @include res("md-and-down", $breakpoints-spec) {
      width: 36px;
    }
  }

  .description {
    color: #2c2f30;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    pointer-events: none;
    @include res("md-and-down", $breakpoints-spec) {
      font-size: 12px;
    }
  }
}

.img {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
