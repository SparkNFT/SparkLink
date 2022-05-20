<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<style lang="scss" scoped>
@use "../styles/index.scss";
@use "element-plus/theme-chalk/src/common/var" as *;
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@mixin mobile() {
  @include res("sm-and-down", $breakpoints-spec) {
    @content;
  }
}

.title {
  @include index.index-title;
  @include mobile {
    @include index.title-red;
  }
}
</style>
