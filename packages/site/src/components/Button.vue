<template>
  <el-button v-bind="buttonProps" class="btn">
    <Span>
      <template v-if="slots.icon" #icon>
        <slot name="icon"></slot>
      </template>
      <slot></slot>
    </Span>
  </el-button>
</template>

<script lang="ts">
import { computed, useSlots } from "vue";
import Span from "./button/Span.vue";

export enum Type {
  Outlined = "outlined",
  Default = "default",
  Disabled = "disabled",
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{ type?: Type }>(), {
  type: Type.Default,
});

const slots = useSlots();

const buttonProps = computed(() => {
  const $default = { type: "primary" };
  const disabled = { disabled: true };
  const outlined = { type: "primary", plain: true };
  return props.type === Type.Default
    ? $default
    : props.type === Type.Disabled
    ? disabled
    : outlined;
});
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/common/var" as *;
@use "element-plus/theme-chalk/src/mixins/mixins" as *;

@mixin mobile() {
  @include res("sm-and-down", $breakpoints-spec) {
    @content;
  }
}

.btn {
  font-family: "Montserrat";
  padding: 22px 60px;
  border-radius: 15px;
  :deep(span) {
    font-weight: 700;
    font-size: 24px;
  }
  @include mobile {
    padding: 18px 60px;
    :deep(span) {
      font-size: 18px;
    }
  }
}
</style>
