<template>
  <el-card shadow="never" :class="{ meta: true, mobile: !grid.md }">
    <template #title> Metadata </template>
    <el-descriptions :column="grid.md ? 12 : 6" :border="grid.md">
      <el-descriptions-item
        v-for="item in displayItems"
        :key="item.label"
        :label="item.label"
        :span="item.span"
        min-width="100"
      >
        <span v-if="typeof item.value === 'boolean' " class="material-icons-outlined">{{item.value ? "check" : "clear"}}</span>
        <span v-else>{{ item.value }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script lang="ts" setup>
import { grid } from "../../grid";
import { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { computed } from "vue";
import { useStore } from "vuex";
import type Web3 from "web3";
import { useI18n } from "vue-i18n";


const { t } = useI18n({
  messages: {
    en: {
      labels: {
        price: "Selling Price",
        baseline: "Child node's price baseline",
        encrypted: "Content encrypted",
        dividenRate: "Dividen rate",
        derived: "Allow derivative works",
        maxSharingTimes: "Max sharing times",
        remainingSharingTimes: "Remaining Sharing times",
      },
    },
    "zh-CN": {
      labels: {
        price: "销售价格",
        baseline: "子节点的价格基线",
        encrypted: "加密",
        dividenRate: "收益比例",
        derived: "允许二次创作",
        maxSharingTimes: "最高分享次数",
        remainingSharingTimes: "剩余分享次数"
      },
    },
  },
});

const props = defineProps<{
  infomation: INftInformation;
  symbol: string;
}>();
const store = useStore();
const web3 = computed(() => store.state.web3.web3 as Web3);

const sellingPrice = computed(() => {
  if (web3.value && props.infomation) {
    return `${web3.value.utils.fromWei(
      props.infomation.sellingPrice.toString()
    )} ${props.symbol}`;
  }
  return undefined;
});

interface IDisplayItem {
  label: string;
  value: string | boolean;
  span: number;
}

const displayItems = computed(() => {
  const information = props.infomation;
  return [
    { label: t("labels.price"), value: sellingPrice.value, span: 6 },
    {
      label: t("labels.baseline"),
      value: `${information.baseline}%`,
      span: 6,
    },
    { label: t("labels.encrypted"), value: information.encrypted, span: 6 },
    {
      label: t("labels.dividenRate"),
      value: `${information.percentageOfEarnings}%`,
      span: 6,
    },
    {
      label: t("labels.derived"),
      value: information.allowSecondaryCreation,
      span: 6,
    },
    {
      label: t("labels.maxSharingTimes"),
      value: information.maxShareTimes,
      span: 6,
    },
    {
      label: t("labels.remainingSharingTimes"),
      value: information.remainShareTimes,
      span: 12,
    },
  ] as IDisplayItem[];
});
</script>

<style lang="scss" scoped>
.meta {
  border: unset;
  :deep(.el-card__body) {
    padding: unset;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    align-items: stretch;
  }

  &.mobile {
    :deep(.el-descriptions__cell) {
      display: flex;
      justify-content: space-between;
    }
  }

  .meta-card {
    cursor: initial;
    & + .meta-card {
      margin-left: unset;
    }
  }
}
</style>
