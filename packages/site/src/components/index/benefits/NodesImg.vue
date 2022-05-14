<template>
  <img :src="t('src')" class="nodes" />
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      src: "/assets/how-to-benefit/nodes_en.png",
    },
    "zh-CN": {
      src: "/assets/how-to-benefit/nodes_zh.png",
    },
  },
});

</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

@mixin mobile() {
  @include res("md-and-down", $breakpoints-spec) {
    @content;
  }
}

.nodes {
  width: 50%;
  transition: all 0.8s ease-in-out;
  @include mobile() {
    width: 100%;
  }
}
</style>
