<template>
  <div class="img">
    <el-image class="inner" :src="url" fit="cover"></el-image>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ url: string }>();
</script>

<style lang="scss" scoped>
.img {
  position: relative;
  width: 526px;
  filter: drop-shadow(17px 24px 58px rgba(239, 122, 97, 0.25));
  border-radius: 20px;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
}

.inner {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
