<template>
  <div v-if="grid.lg" class="end">
    <el-select
      v-if="chainName"
      class="chain-selector"
      :model-value="chainId"
      @update:model-value="web3Operator.switchNetwork($event)"
    >
      <el-option
        v-for="item in networkSelectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select
      class="switch-lan"
      :model-value="current_language"
      @change="switchLanguage"
    >
      <el-option
        v-for="item in languages"
        :key="item.name"
        :label="item.name"
        :value="item.locale"
      />
    </el-select>
    <el-tooltip v-if="account">
      <template #content>
        {{ t("account.address._1") }}{{ account }} <br /><br />
        {{ t("account.address._2") }}
      </template>
      <el-button
        type="text"
        class="btn connected-info"
        @click="web3Operator.disconnect"
      >
        {{ t("account.connected") }}
      </el-button>
    </el-tooltip>
    <el-button v-else-if="allowConnection" type="text"
      >{{ t("account.connecting") }}
    </el-button>
    <el-button
      v-else
      type="primary"
      class="btn connect-btn"
      @click="web3Operator.connect"
    >
      {{ t("account.connect") }}
    </el-button>
  </div>
  <div v-else>
    <el-dropdown
      size="large"
      split-button
      type="primary"
      @command="onCommand"
      @click="onDropdownClick"
    >
      {{ chainName ? chainName : "Connect" }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="account" command="account">
            {{ t("account.dropdown.account") }}
          </el-dropdown-item>
          <el-dropdown-item v-if="account" command="network">
            {{ t("account.dropdown.network") }}
          </el-dropdown-item>
          <el-dropdown-item command="language" :divided="!!account"
            >{{ t("language") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <CheckAccountDialog
      v-model="checkAccountDialog"
      :account="account"
    ></CheckAccountDialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { grid } from "../../grid";
import { web3Operator, web3InfoGetter, walletInfoGetter } from "../../store";
import { networkSelectOptions } from "../../store/web3";
import CheckAccountDialog from "./CheckAccountDialog.vue";
import { useI18n } from "vue-i18n";
import { changeLocale } from "../../i18n";

const { t } = useI18n({
  messages: {
    en: {
      language: "Language",
      account: {
        connect: "CONNECT WALLET",
        connected: "Connected",
        connecting: "Connecting",
        address: {
          _1: "Address: ",
          _2: "Click to disconnected.",
        },
        dropdown: {
          account: "Check account",
          network: "Switch network",
        },
      },
    },
    "zh-CN": {
      language: "语言",
      account: {
        connect: "连接账户",
        connected: "已连接",
        connecting: "连接中",
        address: {
          _1: "地址：",
          _2: "单击以断开连接",
        },
        dropdown: {
          account: "检查连接地址",
          network: "更换网络",
        },
      },
    },
  },
});
const { locale } = useI18n({ useScope: "global" });
const chainName = web3InfoGetter.chain.name;
const chainId = web3InfoGetter.chain.id;
const account = web3InfoGetter.account;
const allowConnection = walletInfoGetter.allowConnection;
const hasProvider = web3InfoGetter.hasProvider;

const checkAccountDialog = ref(false);
const switchNetworkDialog = ref(false);
const current_language = ref(locale.value);

async function onCommand(command: string) {
  switch (command) {
    case "account":
      checkAccountDialog.value = true;
      break;
    case "network":
      switchNetworkDialog.value = true;
      break;
    default:
      break;
  }
}

async function onDropdownClick() {
  if (account.value) onCommand("network");
  else web3Operator.connect();
}

const languages = computed(
  () =>
    [
      { locale: "en", name: "EN" },
      { locale: "zh-CN", name: "CH" },
    ].map((e) => ({ ...e, current: e.locale === locale.value })) as {
      locale: "en" | "zh-CN";
      name: string;
      current: boolean;
    }[]
);

function switchLanguage(locale: "en" | "zh-CN") {
  changeLocale(locale);
  current_language.value = locale;
}
</script>

<style lang="scss" scoped>
.end {
  display: flex;
  align-items: center;
}

.chain-selector {
  max-width: 100px;

  & + * {
    margin-left: 16px;
  }
}

.btn + .btn {
  margin-left: 16px;
}

.connected-info {
  color: #f5f5f5;
  font-size: 18px;
  font-weight: bold;
  margin-left: 40px;
}

@mixin select {
  :deep(.el-input__inner) {
    color: white;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    background-color: unset;
    border: 1px solid #ffffff;
    border-radius: 5px;
  }

  :deep(.el-select__caret) {
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
}

.chain-selector {
  @include select;
}

.switch-lan {
  @include select;
  width: 75px;
}

.connect-btn {
  width: 283px;
  height: 70px;
  border-radius: 15px;
  border: none;
  background-color: #ffe177;
  cursor: pointer;
  margin-left: 40px;

  :deep(span) {
    font-size: 20px;
    font-weight: bold;
    color: #ff6e65;
  }
}
</style>
