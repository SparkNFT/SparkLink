<template>
  <section id="main-block">
    <el-row>
      <el-col :span="12" class="column-1">
        <el-image src="/public/main-logo.png" class="logo" />
        <h2 class="main-text">Publish, support, and spread what you love</h2>
        <p class="sub-text">Spreads and supports each other, Like a spark that will link and light up the world.</p>
        <div class="divider" />
        <div class="btn-area">
          <el-button type="primary" id="publish-btn" @click="gotoPublishPage">Publish</el-button>
          <el-button type="primary" id="buy-btn" plain >Buy</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script lang="ts" setup>

import {useRouter} from "vue-router";

const router = useRouter();

function gotoPublishPage() {
  router.push("/publish")
}
</script>

<style lang="scss" scoped>
  #main-block {
    padding: 64px 0;
  }

  .column-1 {
    display: flex;
    flex-direction: column;
  }

  .logo {
    width: 400px;
  }

  .main-text {
    font-size: 1.5rem;
  }

  .sub-text {
    font-size: 1.125rem;
  }

  .divider {
    height: 16px;
  }

  .btn-area {
    display: flex;

    #publish-btn {
      background-color: var(--color-secondary);
    }
  }
</style>