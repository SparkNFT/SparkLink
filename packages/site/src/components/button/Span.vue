<template>
  <span v-if="slots.icon" class="btn-text">
    <slot name="icon"></slot>
    <slot></slot>
  </span>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="scss" scoped>
.btn-text {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: auto;
  gap: 18px;
}
</style>
