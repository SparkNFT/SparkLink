<template>
  <el-dialog
    :model-value="modelValue"
    :title="t('title')"
    @update:model-value="emitModelValue"
  >
    <template v-if="account">
      <p>{{ t("connected") }}</p>
      <el-input readonly :model-value="account"></el-input>
    </template>
    <template v-else>
      <p>{{ t("connect") }}</p>
    </template>
    <template #footer>
      <el-button
        v-if="account"
        type="primary"
        plain
        @click="operator.disconnect"
      >
        {{ t("btn.disconnect") }}
      </el-button>
      <el-button v-else type="primary" @click="operator.connect">
        {{ t("btn.connect") }}
      </el-button>
      <el-button type="primary" @click="emitModelValue(false)">
        {{ t("btn.close") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { web3Operator as operator } from "../../store";

const { t } = useI18n({
  messages: {
    en: {
      connected: "The Connected Account is:",
      connect: 'Press "Connect" to connect to your account.',
      title: "Check Account",
      btn: {
        disconnect: "Disconnect",
        connect: "Connect",
      },
    },
    "zh-CN": {
      connected: "目前的钱包地址为：",
      connect: "点击“连接钱包”以连接你的钱包",
      title: "检查连接地址",
      btn: {
        disconnect: "断开连接",
        connect: "连接钱包",
      },
    },
  },
});

defineProps<{ account: string; modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
}
</script>
