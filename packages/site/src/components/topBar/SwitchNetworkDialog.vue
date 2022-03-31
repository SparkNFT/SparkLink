<template>
  <div class="switch-network">
    <Dialog
      v-if="canSwitchNetwork"
      :model-value="modelValue"
      @update:model-value="emit(`update:modelValue`, $event)"
    >
      <template #desktop>
        <p>{{ t("switch") }}</p>
        <div class="btn-area">
          <el-button
            v-for="{ label, value } in networkSelectOptions"
            :key="value"
            :color="greyBackground"
            :type="current(value) ? undefined : `text`"
            :class="{ current: current(value), 'select-btn': true }"
            round
            @click="onClick(value)"
            >{{ label }}</el-button
          >
        </div>
      </template>
      <template #bottom>
        <el-button type="primary" @click="emit(`update:modelValue`, false)">
          {{ t("btn.close") }}
        </el-button>
      </template>
      <template #mobile>
        <el-button
          v-for="{ label, value } in networkSelectOptions"
          :key="value"
          :color="greyBackground"
          :type="current(value) ? undefined : `text`"
          :class="{ current: current(value), 'select-btn': true }"
          round
          @click="onClick(value)"
          >{{ label }}</el-button
        >
      </template>
    </Dialog>
    <Dialog
      v-else
      :model-value="modelValue"
      @update:model-value="emit(`update:modelValue`, $event)"
    >
      <template #desktop>
        <span>{{ t("hint") }}</span>
      </template>
      <template #mobile>
        <span>{{ t("hint") }}</span>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { web3Operator, web3InfoGetter } from "../../store";
import { networkSelectOptions } from "../../store/web3";
import { grid } from "../../grid";
import { greyBackground } from "../../styles/color";
import Dialog from "../../components/Dialog.vue";
import { useI18n } from "vue-i18n";
import { canSwitchNetwork as _canSwitchNetwork } from "../../store/web3";

const canSwitchNetwork = _canSwitchNetwork();

const { t } = useI18n({
  messages: {
    en: {
      switch: "Select the network you want to operate on:",
      hint:
        "Current web3 provider does not support network switching. " +
        "Please switch the network on your wallet app.",
    },
    "zh-CN": {
      switch: "请选择网络：",
      hint: "目前的Provider不支持在DAPP中更改网络。请在钱包内更改网络。",
    },
  },
});

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

function current(chainId: number) {
  return chainId === web3InfoGetter.chain.id.value;
}

async function onClick(chainId: number) {
  const hasSwitched = await web3Operator.switchNetwork(chainId);
  if (hasSwitched) emit("update:modelValue", false);
}
</script>
<style lang="scss" scoped>
.switch-network :deep(.btn.el-button.is-plain) {
  &:hover,
  &:focus,
  &:active {
    background-color: var(--el-button-bg-color);
    color: var(--el-button-text-color);
  }
}

.switch-network :deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  button {
    margin-left: unset;
  }
}

.select-btn {
  color: var(--el-text-color-regular);
}

.current {
  color: black;
}
</style>
