<template>
  <div :class="{card: true, mobile: !grid.sm}">
    <p class="step">step {{ step }}</p>
    <el-image :src="iconUrl" style="height: 78px;"></el-image>
    <h3 class="title">{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
import {grid} from "../../grid"
defineProps<{
  step: number;
  iconUrl: string;
  title: string;
  description: string;
}>();
</script>

<style lang="scss" scoped>
.card {
  border: var(--el-border-base);
  box-sizing: border-box;
  box-shadow: 0px 45px 55px rgba(18, 17, 39, 0.08);
  border-radius: 20px;
  padding: 52px 36px 70px;
  background-color: white;
  flex: 1;
  &+.card {
    margin-left: 80px;
  }

  .step {
    margin-bottom: 36px;
    color: var(--color-primary-dark);
  }

  .title {
    margin-bottom: 68px;
  }
}

.card.mobile {
  padding: 20px;
  .step {
    margin-bottom: 16px;
  }
  .title {
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>
