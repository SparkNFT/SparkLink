<template>
  <el-header class="header">
    <el-image src="/src/assets/logo.png" class="logo"></el-image>
    <div class="nav">
      <router-link v-for="item in navs" :key="item.name" :to="item.path">
        {{ item.name }}
      </router-link>
    </div>
    <div class="space" />
    <div class="end">
      <el-button type="text" class="lang-btn">Language</el-button>
      <el-tooltip v-if="metaMask.state.account">
        <template #content>
          Address: {{ metaMask.state.account }} <br /><br />
          Click to disconnected.
        </template>
        <el-button type="text" class="connected-info" @click="disconnect">
          Connected
        </el-button>
      </el-tooltip>
      <span v-else-if="metaMask.state.canConnect">Connecting...</span>
      <el-button
        v-else
        type="primary"
        :disabled="!metaMask.state.hasProvider"
        class="connect-btn"
        @click="connect"
      >
        Connect Wallet
      </el-button>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import {
  metaMask,
  ensureConnect,
  disconnect as metaMaskDisconnect,
} from "../metaMask";

const navs = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Publish",
    path: "/publish",
  },
  {
    name: "Collection",
    path: "/collection",
  },
  {
    name: "Wiki",
    path: "/wiki",
  },
  {
    name: "Market",
    path: "/market",
  },
] as { name: string; path: string }[];

function connect() {
  ensureConnect();
}

function disconnect() {
  metaMaskDisconnect();
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 32px;
  --el-header-height: 65px;
  border-bottom: var(--el-border-base);
}

.logo {
  margin-right: 32px;
}

.nav {
  display: flex;
  height: 100%;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    font-size: var(--el-font-size-medium);
  }

  a + a {
    margin-left: 44px;
  }
}

.lang-btn {
  padding: 6px 10px;
}

.connected-info {
  color: var(--el-text-color-primary);
}

.connect-btn {
  padding: 6px 10px;
}
</style>
