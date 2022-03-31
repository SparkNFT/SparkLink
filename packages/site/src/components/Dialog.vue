<template>
  <el-dialog
    v-if="grid.sm"
    :model-value="modelValue"
    :show-close="showClose"
    :close-on-click-modal="canClose"
    :close-on-press-escape="canClose"
    :title="title"
    :lock-scroll="true"
    :width="_width"
    @update:model-value="emit(`update:modelValue`, $event)"
  >
    <div class="dialog">
      <slot name="desktop"></slot>
    </div>
    <template v-if="$slots.bottom" #footer>
      <slot name="bottom"></slot>
    </template>
  </el-dialog>
  <el-drawer
    v-else
    :model-value="modelValue"
    :show-close="mobileShowClose"
    :with-header="!!title"
    :title="title"
    direction="btt"
    size="fit-content"
    :close-on-click-modal="canClose"
    :close-on-press-escape="canClose"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="drawer">
      <slot name="mobile"></slot>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { grid } from "../grid";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    showClose?: boolean;
    canClose?: boolean;
    mobileShowClose?: boolean;
    title?: string | undefined;
    drawerClass?: string | undefined;
    width?: string;
  }>(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  {
    showClose: true,
    canClose: true,
    mobileShowClose: false,
    title: undefined,
    drawerClass: undefined,
    width: undefined
  }
);
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const _width = computed(() => {
  if (props.width) return props.width;
  else if (grid.lgPlus) return "50%";
  else if (grid.md) return "70%";
  else return "90%";
})
</script>

<style lang="scss" scoped>
.drawer,
.dialog {
  display: flex;
  flex-direction: column;
  gap: 16px;
  :deep(.el-button + .el-button) {
    margin-left: unset;
  }
}

.bottom {
  margin-top: 30px;
  display: flex;
}
</style>
