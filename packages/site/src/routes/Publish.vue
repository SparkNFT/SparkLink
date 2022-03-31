<template>
  <div :class="{ 'form-container': true, embed: !grid.lgPlus }">
    <div class="divider" />
    <Title class="_title">{{ t("publish") }}</Title>
    <div v-if="grid.lgPlus" class="divider" />
    <el-divider v-else style="" border-style="dashed"></el-divider>
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
import Title from "../components/Title.vue";
import PublishForm from "../components/publish/PublishForm.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { web3Operator } from "../store";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      publish: "Publish Art",
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
.divider {
  height: 24px;
}

.form-container {
  display: flex;
  flex-direction: column;
  max-width: 1050px;
  margin: auto;
}

@media (min-width: 1050px) {
  .form-container {
    width: 1050px;
  }
}

.embed {
  ._title {
    margin-left: 20px;
  }
}
</style>
