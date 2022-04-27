<template>
  <el-header
    :class="{
      header: true,
      mobile: !grid.md,
      solid: !mobileTransparent,
      fixed: !sticky,
      sticky,
    }"
  >
    <!-- I can not use css to implement the home page background style,so and a background img to act the header background-->
    <img src="/assets/background.png" class="background" />
    <div class="inner">
      <router-link :to="{ name: `index` }" class="logo-a">
        <el-image src="assets/logo.png" class="logo" />
      </router-link>
      <template v-if="grid.md">
        <div class="nav">
          <router-link v-for="item in navs" :key="item.name" :to="item.path">
            {{ item.name }}
          </router-link>
        </div>
        <EndBlock />
      </template>
      <template v-else>
        <div class="space" />
        <button class="reset end" @click="openMobileNav">
          <el-image src="/assets/nav.svg"></el-image>
        </button>
        <NavigationDrawer
          v-model="mobileNavOpened"
          :navs="navs"
        ></NavigationDrawer>
      </template>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { grid } from "../grid";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";
import { useRouter } from "vue-router";
import NavigationDrawer from "./topBar/NavigationDrawer.vue";
import { INavItem } from "./types";
import EndBlock from "./topBar/EndBlock.vue";
import { t } from "../i18n";

withDefaults(defineProps<{ sticky: boolean }>(), { sticky: false });

const navs = computed(
  () =>
    [
      {
        name: t("navs.home"),
        path: "/",
        icon: "home",
      },
      {
        name: t("navs.publish"),
        path: "/publish",
        icon: "file_upload",
      },
      {
        name: t("navs.collection"),
        path: "/collection",
        icon: "collections",
      },
      {
        name: t("navs.wiki"),
        path: "/wiki",
        icon: "notes",
      },
    ] as INavItem[]
);

const store = useStore();

const mobileTransparent = ref(true);

function _handleScroll() {
  const t = mobileTransparent.value;
  if (t && window.scrollY > 50) mobileTransparent.value = false;
  else if (!t && window.scrollY < 50) mobileTransparent.value = true;
}

const handleScroll = throttle(_handleScroll, 200);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const mobileNavOpened = ref(false);

function openMobileNav() {
  mobileNavOpened.value = true;
}

const router = useRouter();

function navTo(path: string) {
  router.push(path);
}
</script>

<style lang="scss" scoped>
$height: 108px;
.header {
  --el-header-height: #{$height};
  border-bottom: var(--el-border-base);
  position: fixed;
  z-index: 10;
  width: 100%;
  box-sizing: content-box;
  padding-left: unset;
  border: none;
  overflow-x: hidden;

  .background {
    width: 100%;
    position: absolute;
    z-index: -1;
  }

  > .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 113px;
    box-sizing: border-box;
  }

  &.mobile {
    &.fixed {
      border-bottom: none;
      background-color: unset;

      &.solid {
        border-bottom: var(--el-border-base);
        background-color: white;
      }
    }

    .nav {
      display: grid;
      height: 100%;
      align-items: center;
      grid-template-columns: repeat(auto-fit, 45%);
      justify-content: center;

      button {
        margin-left: unset;
        flex: 1;
      }

      flex-wrap: wrap;
      gap: 16px;
    }

    :deep(.down.drawer) {
      #el-drawer__title {
        margin-bottom: 16px;
      }
    }
  }
}

.logo {
  width: 193px;
}

.nav {
  display: flex;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    font-weight: bold;
  }

  a + a {
    margin-left: 44px;
  }
  a.router-link-exact-active {
    color: #ffea07;
  }
}

.lang-btn {
  margin-left: 10px;
  padding: 6px 10px;
}

.connected-info {
  color: var(--el-text-color-primary);
  padding: 6px 10px;
}

.chain-selector {
  width: 110px;
}

.nav-btn {
  width: 100%;

  > :deep(span) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
