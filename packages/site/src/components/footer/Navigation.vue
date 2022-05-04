<template>
  <section class="item">
    <h5 class="title">{{ title }}</h5>
    <router-link
      v-for="(item, index) in items"
      :key="index"
      :to="item.route"
      :class="{ inline: !useName(item) }"
    >
      <template v-if="useName(item)">
        {{ getName(item) }}
      </template>
      <i v-else :class="getIcon(item)" style="font-size: 24px;"></i>
    </router-link>
  </section>
</template>

<script lang="ts" setup>
import type {
  IFooterNavItem,
  IFooterNavItemUsingIcon,
  IFooterNavItemUsingName,
} from "../types";

const props = defineProps<{ title: string; items: IFooterNavItem[] }>();

function useName(item: IFooterNavItem) {
  return !!getName(item);
}

function getName(item: IFooterNavItem) {
  return (<IFooterNavItemUsingName>item).name;
}

function getIcon(item: IFooterNavItem) {
  return (<IFooterNavItemUsingIcon>item).icon;
}
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

.item {
  @include res("md-and-up", $breakpoints-spec) {
    max-width: 330px;
    &:last-child {
      max-width: 310px;
    }
  }

  .title {
    margin: 0 0 40px 0;
    color: #ffea07;
    font-size: 28px;
    font-weight: 800;
    line-height: 30px;
    text-align: left;

    @include res("sm-and-down", $breakpoints-spec) {
      font-size: var(--el-font-size-large);
      margin-bottom: 20px;
    }
  }

  a {
    display: block;
    margin: 0 0 30px 0;
    color: white;
    font-size: 20px;
    font-weight: 600;
    line-height: 26px;
    text-align: left;
    text-decoration: none;

    @include res("sm-and-down", $breakpoints-spec) {
      font-size: var(--el-font-size-medium);
      font-weight: unset;

      margin-bottom: 8px;
    }

    &.inline {
      display: inline;
      margin-right: 20px;
    }
  }
}

.title,
a {
  font-family: "Open Sans";
}
</style>
