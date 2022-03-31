<template>
  <SwitchLanguage v-model="open"> </SwitchLanguage>
  <el-button @click="open = true">{{t("btn")}}</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import SwitchLanguage from "../../components/topBar/SwitchLanguage.vue";

const { t } = useI18n({ messages: { en: { btn: "en" }, "zh-CN": {btn: "zh-CN"} } });

const open = ref(true);
</script>
