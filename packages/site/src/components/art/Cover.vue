<template>
  <el-card shadow="never" class="image-area">
    <el-image :src="url" class="image" fit="contain">
      <template #placeholder>
        <div class="image-slot">Loading<span class="dot">...</span></div>
      </template>
    </el-image>
  </el-card>
</template>

<script lang="ts" setup>
defineProps<{ url: string }>();
</script>

<style lang="scss" scoped>
.image-area {
  :deep(.el-card__body) {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: unset;
  }
}

.image {
  :deep(.el-image__inner) {
    height: 350px;
  }
}

.image-slot {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
