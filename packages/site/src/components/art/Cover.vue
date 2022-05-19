<template>
  <div class="img">
    <el-image class="inner" :src="url" fit="cover"></el-image>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ url: string }>();
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;
.img {
  position: relative;
  filter: drop-shadow(17px 24px 58px rgba(239, 122, 97, 0.25));
  border-radius: 20px;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  
  @include desktop {
    width: 526px;
  }

  @include mobile {
    filter: drop-shadow(4px 16px 42px rgba(239, 122, 97, 0.25));
  }
}

.inner {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
