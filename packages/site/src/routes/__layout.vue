<template>
  <el-container
    direction="vertical"
    style="min-height: 100vh"
    :class="{ embed: !grid.lgPlus, wrapper: true }"
  >
    <TopBar :sticky="topBarShouldBeSticky" />
    <el-main class="main">
      <RouterView />
    </el-main>
    <the-footer />
  </el-container>
</template>

<script lang="ts" setup>
import { grid } from "../grid";
import TopBar from "../components/TopBar.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed } from "vue";
import { web3Operator } from "../store";
import { onMounted } from "vue";
import TheFooter from "../components/TheFooter.vue";

onBeforeRouteUpdate(() => {
  web3Operator.connectWhenNeed();
});

onMounted(() => web3Operator.connectWhenNeed());
const route = useRoute();
const topBarShouldBeSticky = computed(() => {
  return route.name !== "index";
});
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

.wrapper {
  @include res("md-and-up", $breakpoints-spec) {
    --header-height: 108px;
  }

  @include res("sm-and-down", $breakpoints-spec) {
    --header-height: 74px;
  }
}

.main {
  padding: var(--header-height) 0 0 0;
}

.notification {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--el-border-color-extra-light);
  color: var(--el-text-color-regular);
  padding: 16px 32px;

  &.offset {
    position: absolute;
    top: 65px;
    z-index: 100;
    background-color: unset;
  }
}

.embed {
  .wrapper {
    width: 100%;
  }
}
</style>
