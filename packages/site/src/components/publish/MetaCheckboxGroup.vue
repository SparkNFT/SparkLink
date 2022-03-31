<template>
  <el-checkbox
    v-model="data.allowSecondaryCreation"
    border
    :class="checkboxClass"
    label="allowSecondaryCreation"
  >
    {{t("_1")}}
  </el-checkbox>
  <!-- <el-checkbox
    v-model="data.allowCommercialUsage"
    border
    :class="checkboxClass"
    label="allowCommercialUsage"
  >
    Allow commercial use
  </el-checkbox>
  <el-checkbox
    v-model="data.freeForSecondLevel"
    border
    :class="checkboxClass"
    laebl="freeForSecondLevel"
  >
    First-class nodes are allowed to be cast free of charge
  </el-checkbox> -->
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: { _1: "Allow secondary creation" },
    "zh-CN": { _1: "允许二次创作" },
  },
});

defineProps<{
  checkboxClass?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: IData): void;
}>();

interface IData {
  allowSecondaryCreation: boolean;
}

const data = reactive({
  allowSecondaryCreation: false,
} as IData);

watch(
  () => {
    return [data.allowSecondaryCreation];
  },
  () => emit("update:modelValue", data)
);
</script>
