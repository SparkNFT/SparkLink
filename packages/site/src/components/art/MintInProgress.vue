<template>
  <Dialog
    :model-value="modelValue"
    :show-close="false"
    :can-close="false"
    :title="t('title')"
    @update:model-value="emitModelValue"
  >
    <template #desktop>
      <Timeline
        :progress="progress"
        :custom-message="_message"
        :items="timelineItems"
      ></Timeline>
    </template>
    <template #bottom>
      <el-button type="primary" :disabled="!newId" @click="goToThePage">
        {{ t("to") }}
      </el-button>
      <el-button
        type="primary"
        :disabled="!newId"
        @click="emitModelValue(false)"
      >
        {{ t("close") }}
      </el-button>
    </template>
    <template #mobile>
      <Timeline
        :progress="progress"
        :custom-message="_message"
        :items="timelineItems"
      ></Timeline>
      <el-button type="primary" :disabled="!newId" @click="goToThePage">
        {{ t("to") }}
      </el-button>
      <el-button
        type="primary"
        :disabled="!newId"
        @click="emitModelValue(false)"
      >
        {{ t("close") }}
      </el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
// Scope: Transient

import {
  BuyEvent,
  BuyEventEmitter,
  IBuyEventEmitter,
  UserOperatorFactory,
} from "@SparkLink/business";
import { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Dialog from "../Dialog.vue";
import Timeline from "../Timeline.vue";
import type { ITimelineItem } from "../types";

const { t } = useI18n({
  messages: {
    en: {
      title: "Minting",
      steps: {
        approve: {
          before: "Approve token",
          doing: "Approving token",
          after: "Approved token",
        },
        mint: {
          before: "Mint",
          doing: "Minting",
          after: "Minted",
          confirm: "Confirm num: ",
        },
      },
      to: "Go to your NFT",
    },
    "zh-CN": {
      title: "铸造中",
      steps: {
        before: {
          before: "对代币合约调用Approve方法",
          doing: "对代币合约调用Approve方法中",
          after: "已对代币合约调用Approve方法",
        },
        mint: {
          before: "铸造",
          doing: "铸造中",
          after: "铸造完成",
          confirm: "确认数：",
        },
        to: "前往NFT页面",
      },
    },
  },
});

const props = defineProps<{
  modelValue: boolean;
  metadata: INftInformation;
  nftId: string;
}>();

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
}

const store = useStore();
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);

const newId = ref("");

const progress = ref(0);

const message = ref("");

const minConfirmationNum = computed(
  () => store.state.web3.minConfirmationNum as number
);

const _message = computed(() => {
  if (!message.value) return undefined;
  else
    return {
      index: progress.value,
      message: message.value,
    };
});

watch(progress, () => (message.value = ""));

async function mint() {
  const nftId = props.nftId;
  const shop = factory.value.shop;
  const eventEmitter: IBuyEventEmitter = new BuyEventEmitter();

  eventEmitter.on(BuyEvent.approved, () => progress.value++);
  eventEmitter.on(BuyEvent.accepted, () => progress.value++);
  eventEmitter.on(BuyEvent.confirm, (confNum) => {
    message.value = `${t("steps.mint.confirm")}[${confNum}/${
      minConfirmationNum.value
    }]`;
  });
  const { nftId: _newId } = await shop.buy(
    nftId,
    eventEmitter as BuyEventEmitter,
    {
      sellingPrice: props.metadata.sellingPrice,
      paymentCurrency: props.metadata.paymentCurrency,
    }
  );
  newId.value = _newId;
}

const router = useRouter();

function goToThePage() {
  router.push({ name: "art", params: { nftId: newId.value } });
}

const timelineItems = [] as ITimelineItem[];
if (!props.metadata.paymentCurrency.isZeroAddress()) {
  timelineItems.push({
    before: t("steps.approve.before"),
    doing: t("steps.approve.doing"),
    after: t("steps.approve.after"),
  });
}
timelineItems.push({
  before: t("steps.mint.before"),
  doing: t("steps.mint.doing"),
  after: t("steps.mint.after"),
});

mint();
</script>
