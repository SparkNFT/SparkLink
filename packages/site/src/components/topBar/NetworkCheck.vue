<template>
  <div style="position: absolute"></div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { web3InfoGetter } from "../../store";
import { chainIdToName } from "../../token";

const { t } = useI18n({
  messages: {
    en: {
      inValid:
        "Current Chain is not support. please switch to a support chain.",
    },
    "zh-CN": {
      inValid: "不支持当前链。请切换到支持链。",
    },
  },
});

const route = useRoute();

const chainId = web3InfoGetter.chain.id;
const chainValid = computed(
  () => chainId.value === -1 || chainIdToName.has(chainId.value)
);
function checkChainValid() {
  if (!chainValid.value) ElMessage({ message: t("inValid"), type: "error" });
}
// TODO: Optimize pattern like this.
watch([chainValid, route], checkChainValid);
onMounted(checkChainValid);
</script>
