<template>
  <h2 class="title">{{ metadata.name }}</h2>
</template>

<script lang="ts" setup>
import { getNftInfo } from "../../store/info";

defineProps<{ metadata: Awaited<ReturnType<typeof getNftInfo>> }>();
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.title {
  font-size: 36px;
  font-weight: 800;
  margin-block-start: unset;
  margin-block-end: unset;
  @include mobile {
    font-size: 28px;
  }
}
</style>
