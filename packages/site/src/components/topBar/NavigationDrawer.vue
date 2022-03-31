<template>
  <el-drawer
    :model-value="modelValue"
    direction="ltr"
    size="80%"
    :show-close="false"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="container">
      <el-image src="/assets/main-logo.svg" class="logo" />
      <div class="inner">
        <div class="nav">
          <el-button
            v-for="item in navs"
            :key="item.name"
            :type="current(item.path) ? undefined : `text`"
            round
            :class="{
              normal: !current(item.path),
              current: current(item.path),
            }"
            :color="current(item.path) ? greyBackground : undefined"
            @click="navTo(item.path)"
          >
            <div class="btn-inner">
              <span class="material-icons-outlined">{{ item.icon }}</span>
              <span>{{ item.name }}</span>
            </div>
          </el-button>
        </div>
        <div class="end">
          <SwitchNetworkDialog v-model="switchNetwork"></SwitchNetworkDialog>
          <SwitchLanguage v-model="switchLanguage"></SwitchLanguage>
          <transition name="fade">
            <el-button
              v-if="chainName"
              :color="greyBackground"
              round
              @click="switchNetwork = true"
              >{{ chainName }}</el-button
            >
          </transition>

          <div class="row">
            <el-button type="text" @click="switchLanguage = true">
              <div class="btn-inner">
                <span class="material-icons-outlined">language</span>
                <span>{{ t("language") }}</span>
              </div>
            </el-button>
            <el-button
              v-if="!account"
              type="text"
              @click="web3Operator.connect"
            >
              <div class="btn-inner">
                <span class="material-icons-outlined">fingerprint</span>
                <span>{{ t("link") }}</span>
              </div>
            </el-button>
            <el-button
              v-else
              :color="greyBackground"
              round
              @click="web3Operator.disconnect"
            >
              {{
                `${account.slice(0, 5)}...${account.slice(account.length - 4)}`
              }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useNavTo } from "../../router";
import { INavItem } from "../types";
import { web3Operator, web3InfoGetter } from "../../store";
import SwitchNetworkDialog from "./SwitchNetworkDialog.vue";
import SwitchLanguage from "./SwitchLanguage.vue";
import { ref } from "vue";
import { greyBackground } from "../../styles/color";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: { en: { link: "Connect wallet" }, "zh-CN": { link: "连接钱包" } },
});

const account = web3InfoGetter.account;
const chainName = web3InfoGetter.chain.name;

defineProps<{ modelValue: boolean; navs: INavItem[] }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
const route = useRoute();
function current(path: string) {
  return route.fullPath === path;
}

const navTo = useNavTo(() => emit("update:modelValue", false));

const switchNetwork = ref(false);
const switchLanguage = ref(false);
</script>

<style lang="scss" scoped>
.container,
.nav,
.end,
.container > .inner {
  display: flex;
  flex-direction: column;
}

.container {
  height: 100%;
  gap: 40px;
  & > .inner {
    justify-content: space-between;
    flex: 1;
  }
}

.logo {
  max-height: 50px;
}

.nav {
  align-items: stretch;
  :deep(.el-button + .el-button) {
    margin-left: unset;
  }
}

.normal {
  padding-left: 20px;
}

.current {
  .btn-inner {
    color: black;
  }
}

.end {
  gap: 16px;
}

.btn-inner,
.row {
  display: flex;
  align-items: center;
}

.btn-inner {
  gap: 16px;
  font-weight: bold;
  color: var(--el-text-color-regular);
}

.row {
  justify-content: space-between;
  .btn-inner {
    gap: 12px;
  }
}
</style>
