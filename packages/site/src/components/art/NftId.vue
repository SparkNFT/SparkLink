<template>
  <span class="nft-id">#{{ nftId }}</span>
</template>

<script lang="ts" setup>
defineProps<{ nftId: string }>();
</script>

<style lang="scss" scoped>
.nft-id {
  font-size: 24px;
  color: var(--el-color-primary);
  font-weight: 600;
}
</style>
