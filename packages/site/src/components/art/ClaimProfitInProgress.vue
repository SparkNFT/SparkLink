<template>
  <Dialog
    :model-value="modelValue"
    :show-close="false"
    :can-close="false"
    :title="t('title')"
  >
    <template #desktop>
      <Timeline
        :progress="progress"
        :custom-message="_message"
        :items="timelineItems"
      ></Timeline>
    </template>
    <template #bottom>
      <el-button type="primary" :disabled="!done" @click="emit(`update:modelValue`, false)">{{t("btn.close")}}</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
// Scope: Transient

import {
  ClaimEvent,
  ClaimEventEmitter,
  UserOperatorFactory,
} from "@SparkLink/business";
import Dialog from "../Dialog.vue";
import Timeline from "../Timeline.vue";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { ITimelineItem } from "../types";

const { t } = useI18n({
  messages: {
    en: {
      title: "Claiming",
      steps: {
        claim: {
          before: "Claim profit",
          doing: "Claiming profit",
          after: "Claimed profit",
          confirm: "Confirm num: ",
        },
      },
      btn: {
        close: "Close"
      }
    },
  },
});

const props = defineProps<{ modelValue: boolean; nftId: string }>();

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const store = useStore();
const factory = computed(
  () => store.getters["web3/userOperatorFactory"] as UserOperatorFactory
);
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
const done = ref(false);

async function claimProfit() {
  const nftId = props.nftId;
  const profitClaimer = factory.value.profitClaimer;
  const eventEmitter = new ClaimEventEmitter();
  eventEmitter.on(ClaimEvent.claimed, () => progress.value++);
  eventEmitter.on(ClaimEvent.confirm, (confNum) => {
    message.value = `${t("steps.claim.confirm")}
    [${confNum}/${minConfirmationNum.value}]`;
  });
  await profitClaimer.claim(nftId, eventEmitter);
  done.value = true;
}

const timelineItems = [] as ITimelineItem[];
timelineItems.push({
  before: t("steps.claim.before"),
  doing: t("steps.claim.doing"),
  after: t("steps.claim.after"),
});

claimProfit();
</script>
