<template>
  <Dialog
    :model-value="modelValue"
    :show-close="false"
    :can-close="false"
    :title="t('title')"
    @update:model-value="emit(`update:modelValue`, $event)"
  >
    <template #desktop>
      <Timeline
        :progress="progress"
        :items="timelineItems"
        :custom-message="customMessage"
      ></Timeline>
      <div class="divider" />
      <div class="container">
        <span v-if="!canClose" class="description">
          Please DO NOT close this page until all steps completed.
        </span>
        <span v-else class="description">
          Publish successfully. The NFT ID is: {{ nftId }}, please view your
          NFTs in Collection.
        </span>
      </div>
    </template>
    <template #bottom>
      <el-button
        type="primary"
        :disabled="!canClose"
        @click="
          router.push({
            name: 'art',
            params: { chainId: web3InfoGetter.chain.id.value, nftId },
          })
        "
      >
        View
      </el-button>
      <el-button
        type="primary"
        :disabled="!canClose"
        @click="emitModelValue(false)"
        >Close
      </el-button>
    </template>
    <template #mobile>
      <Timeline
        :progress="progress"
        :items="timelineItems"
        :custom-message="customMessage"
      ></Timeline>
      <div class="divider" />
      <div class="container">
        <span v-if="!canClose" class="description">
          {{ t("hint") }}
        </span>
        <span v-else class="description">
          {{ t("nftId._1") }}{{ nftId }}, {{ t("nftId._2") }}
        </span>
        <el-button
          type="primary"
          :disabled="!canClose"
          @click="emitModelValue(false)"
          >{{ t("btn.close") }}
        </el-button>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { IUploadEventEmitter } from "@SparkLink/business";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type { ITimelineItem } from "../types";
import Timeline from "../Timeline.vue";
import Dialog from "../Dialog.vue";
import { useI18n } from "vue-i18n";
import { web3InfoGetter } from "../../store";

const router = useRouter();

const { t } = useI18n({
  messages: {
    en: {
      titile: "Executing",
      hint: "Please DO NOT close this page until all steps completed.",
      nftId: {
        _1: "Publish successfully. The NFT ID is: ",
        _2: ", please view your NFTs in Collection.",
      },
      steps: {
        generateZip: {
          before: "Generate zip",
          doing: "Generating zip",
          after: "Generated zip",
        },
        encrypt: { before: "Encrypt", doing: "Encrypting", after: "Encrypted" },
        publish: {
          before: "Publish",
          doing: "Publishing",
          after: "Published",
          confirm: "Confirm num: ",
        },
        signRequest: {
          before: "Sign request",
          doing: "Signing request",
          after: "Signed request",
        },
        pinCover: {
          before: "Pin cover",
          doing: "Pinning cover",
          after: "Pinned cover",
        },
        pinContent: {
          before: "Pin content",
          doing: "Pinning content",
          after: "Pinned content",
        },
        pinMetadata: {
          before: "Pin metadata",
          doing: "Pinning metadata",
          after: "Pinned metadata",
        },
      },
    },
    "zh-CN": {
      title: "执行中",
      hint: "在所有步骤完成前请勿关闭此页面。",
      nftId: {
        _1: "发布成功。NFT ID 为：",
        _2: "，请在“收藏”中查看您的NFT。",
      },
      steps: {
        generateZip: {
          before: "生成压缩包",
          doing: "正在生成压缩包",
          after: "已生成压缩包",
        },
        encrypt: { before: "加密", doing: "正在加密", after: "已加密" },
        publish: {
          before: "发布",
          doing: "正在发布",
          after: "已发布",
          confirm: "确认数：",
        },
        signRequest: {
          before: "签署请求",
          doing: "正在签署请求",
          after: "请求已签署",
        },
        pinCover: {
          before: "上传封面",
          doing: "正在上传封面",
          after: "封面已上传",
        },
        pinContent: {
          before: "上传作品",
          doing: "正在上传作品",
          after: "作品已上传",
        },
        pinMetadata: {
          before: "上传元数据",
          doing: "正在上传元数据",
          after: "元数据已上传",
        },
      },
    },
  },
});

const props = defineProps<{
  modelValue: boolean;
  eventEmitter: IUploadEventEmitter;
  encryted: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "listeners:attached"): void;
}>();

function emitModelValue(value: boolean) {
  emit("update:modelValue", value);
}

const store = useStore();
const minConfirmationNum = computed(
  () => store.state.web3.minConfirmationNum as number
);

const timelineItems = [] as ITimelineItem[];

const steps = [
  "generateZip",
  "encrypt",
  "publish",
  "signRequest",
  "pinCover",
  "pinContent",
  "pinMetadata",
].reduce((obj, key) => {
  obj[key] = {
    before: t(`steps.${key}.before`),
    doing: t(`steps.${key}.doing`),
    after: t(`steps.${key}.after`),
  };
  return obj;
}, {} as any);

const stepsIndexes = {
  generateZip: timelineItems.push(steps.generateZip) - 1,
  encrypt: props.encryted ? timelineItems.push(steps.encrypt) - 1 : -1,
  publish: timelineItems.push(steps.publish) - 1,
  signRequest: timelineItems.push(steps.signRequest) - 1,
  pinCover: timelineItems.push(steps.pinCover) - 1,
  pinContent: timelineItems.push(steps.pinContent) - 1,
  pinMetadata: timelineItems.push(steps.pinMetadata) - 1,
} as { [key: string]: number };

const progress = ref(-1);
const customMessage = ref(
  undefined as { index: number; message: string } | undefined
);

const nftId = ref("");
const canClose = ref(false);

props.eventEmitter.on(
  "beginGeneratingZip",
  () => (progress.value = stepsIndexes.generateZip)
);
props.eventEmitter.on(
  "processingZip",
  (percent: number) =>
    (customMessage.value = {
      index: stepsIndexes.generateZip,
      message: `${percent}%`,
    })
);
props.eventEmitter.on("zipGenerated", () => {
  customMessage.value = undefined;
  progress.value = stepsIndexes.generateZip + 1;
});
props.eventEmitter.on(
  "encrypted",
  () => (progress.value = stepsIndexes.encrypt + 1)
);
props.eventEmitter.on("publishConfirmation", (confirm: number) => {
  customMessage.value = {
    index: stepsIndexes.publish,
    message: `${t("steps.publish.confirm")}[${confirm}/${
      minConfirmationNum.value
    }]`,
  };
});
props.eventEmitter.on("published", ({ rootNftId }) => {
  nftId.value = rootNftId;
  progress.value = stepsIndexes.publish + 1;
});
props.eventEmitter.on(
  "signedRequest",
  () => (progress.value = stepsIndexes.signRequest + 1)
);
props.eventEmitter.on(
  "coverPined",
  () => (progress.value = stepsIndexes.pinCover + 1)
);
props.eventEmitter.on(
  "contentPined",
  () => (progress.value = stepsIndexes.pinContent + 1)
);
props.eventEmitter.on("metadataPined", () => {
  progress.value = stepsIndexes.pinMetadata + 1;
  canClose.value = true;
});
emit("listeners:attached");
</script>

<style lang="scss" scoped>
.divider {
  height: 24px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
