<template>
  <Dialog
    :model-value="modelValue"
    @update:model-value="emit(`update:modelValue`, $event)"
  >
    <template #desktop>
      <el-button
        v-for="language in languages"
        :key="language.locale"
        :type="language.current ? undefined : 'text'"
        :color="language.current ? greyBackground : undefined"
        :class="{ btn: true, current: language.current }"
        round
        @click="click(language.locale)"
        >{{ language.name }}</el-button
      >
    </template>
    <template #mobile>
      <el-button
        v-for="language in languages"
        :key="language.locale"
        :type="language.current ? undefined : 'text'"
        :color="language.current ? greyBackground : undefined"
        :class="{ btn: true, current: language.current }"
        round
        @click="click(language.locale)"
        >{{ language.name }}</el-button
      >
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import Dialog from "../Dialog.vue";
import { greyBackground } from "../../styles/color";
import { changeLocale } from "../../i18n";
import { computed } from "vue";

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const { locale } = useI18n({ useScope: "global" });
const languages = computed(
  () =>
    [
      { locale: "en", name: "English" },
      { locale: "zh-CN", name: "简体中文" },
    ].map((e) => ({ ...e, current: e.locale === locale.value })) as {
      locale: "en" | "zh-CN";
      name: string;
      current: boolean;
    }[]
);

function click(locale: "en" | "zh-CN") {
  changeLocale(locale);
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.btn {
  color: var(--el-text-color-regular);
  &.current {
    color: black;
  }
}
</style>
