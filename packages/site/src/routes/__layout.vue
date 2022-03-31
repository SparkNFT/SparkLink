<template>
  <el-container direction="vertical" style="min-height: 100vh;" :class="{embed: !grid.lgPlus}">
    <TopBar :sticky="topBarShouldBeSticky" />
    <el-main :class="{ main: true, 'grey-background': needGreyBackground }">
      <div v-if="route.name === 'art'" class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/collection' }">
            Arts
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            {{ route.params.nftId }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <RouterView />
      </div>

      <div
        v-else-if="route.name === 'collection'"
        class="wrapper collection-wrapper"
      >
        <RouterView />
      </div>
      <div v-else-if="route.name === 'index'" class="index-wrapper">
        <RouterView />
      </div>
      <div v-else class="wrapper">
        <RouterView />
      </div>
    </el-main>
    <Footer />
  </el-container>
</template>

<script lang="ts" setup>
import { grid } from "../grid";
import TopBar from "../components/TopBar.vue";
import Footer from "../components/Footer.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { web3Operator } from "../store";
import { onMounted } from "vue";

const store = useStore();
const hasProvider = computed(() => store.getters["web3/hasProvider"]);

onBeforeRouteUpdate(() => {
  web3Operator.connectWhenNeed();
});

onMounted(() => web3Operator.connectWhenNeed())

const route = useRoute();

const needGreyBackground = computed(
  () => route.name === "collection" || route.name === "art"
);

const topBarShouldBeSticky = computed(() => {
  return route.name !== "index";
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
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

.breadcrumb {
  background-color: white;
  width: 100%;
  padding: 16px 32px;
  box-sizing: border-box;
}

.collection-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.grey-background {
  /**
    Grey is not good.
  */
  //background-color: var(--el-border-color-extra-light);
}

.wrapper {
  max-width: 1344px;
}

.embed {
  .wrapper {
    width: 100%;
  }
}

.index-wrapper {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}
</style>
