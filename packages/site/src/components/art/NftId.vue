<template>
  <span class="nft-id">#{{ nftId }}</span>
</template>

<script lang="ts" setup>
defineProps<{ nftId: string }>();
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.nft-id {
  font-size: 24px;
  color: var(--el-color-primary);
  font-weight: 600;
  @include mobile {
    font-size: var(--el-font-size-medium);
  }
}
</style>
