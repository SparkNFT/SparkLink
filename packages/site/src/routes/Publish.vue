<template>
  <div :class="{ 'form-container': true, embed: !grid.lgPlus }">
    <h2 class="_title">{{ t("publish") }}</h2>
    <PublishForm />
    <div class="divider" />
    <el-dialog v-model="showWarning" title="Warning">
      <span>{{ t("hint") }}</span>
      <el-button type="text" @click="connect">{{ t("connect") }}</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { grid } from "../grid";
import PublishForm from "../components/publish/PublishForm.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { web3Operator } from "../store";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      publish: "Publish",
      hint: "Please connect your wallet to publish art. ",
      connect: "Connect",
    },
    "zh-CN": {
      publish: "发布作品",
      hint: "请连接你的钱包以发布作品。",
      connect: "连接钱包",
    },
  },
});

const store = useStore();
const account = computed(() => store.state.web3.account);
const showWarning = ref(false);

function assertAccountExists() {
  showWarning.value = !account.value;
}

setTimeout(assertAccountExists, 1000);
watch(account, assertAccountExists);

async function connect() {
  const account = await web3Operator.connect();
  ElMessage.success(`Successfully connected to account ${account}.`);
}
</script>

<style lang="scss" scoped>
@use "../styles/index.scss";
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

@mixin mobile() {
  @include res("md-and-down", $breakpoints-spec) {
    @content;
  }
}

.divider {
  height: 24px;
}

.form-container {
  padding-top: 142px;
  padding-bottom: 185px;
  max-width: 1050px;
  margin: auto;
  @include mobile() {
    padding: 0 20px;
    padding-top: 78px;
    padding-bottom: 106px;
  }
}

._title {
  @include index.title-red;
  margin-bottom: 120px;

  @include mobile {
    font-size: 30px;
    margin-bottom: 60px;
  }
}
</style>
