<template>
  <div class="details">
    <template v-for="({ key, label, value, suffix }, index) in data" :key="key">
      <el-divider v-if="index > 0" class="divider"></el-divider>
      <p class="container">
        <span class="label">{{ label }}</span>
        <span class="value-container">
          <span class="value">{{ value }}</span>
          <span v-if="suffix" class="suffix">{{ suffix }}</span>
        </span>
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { INftInformation } from "@SparkLink/business/generated/src/nftInfomation";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { IToken } from "../../token";
import { toCoin } from "./data";

const props = defineProps<{ metadata: INftInformation; token: IToken }>();

const { t } = useI18n({
  messages: {
    en: {
      sellingPrice: "Spark Price:",
      royaltyPrice: "Fixed royalty for root:",
      maxShareTimes: "Maximum number of share:",
      percentageOfEarnings: "Percentage of Earning on sub-node:",
      encrypted: "Work is encrypted:",
      allowSecondaryCreation: "Allow secondary creation:",
      childNodeOwned: "Number of child nodes currently owned:  0",
    },
    "zh-CN": {
      sellingPrice: "点火价格:",
      royaltyPrice: "根节点固定版税抽成:",
      maxShareTimes: "最大分销次数：{times}",
      percentageOfEarnings: "子节点抽成: {percentage}",
      encrypted: "NFT内容是否加密{encrypted}",
      allowSecondaryCreation: "是否允许二次创作：{allow}",
      childNodeOwned: "目前已经有的下级节点：0",
    },
  },
});

const data = computed(() => {
  const order = [
    "sellingPrice",
    "royaltyPrice",
    "maxShareTimes",
    "percentageOfEarnings",
    "encrypted",
    "allowSecondaryCreation",
  ] as (keyof INftInformation)[];
  const result = order.map((v) => ({
    key: v,
    label: t(v),
    value: props.metadata[v],
    suffix: "",
  }));
  result.forEach((v) => {
    if (v.key === "sellingPrice" || v.key === "royaltyPrice") {
      v.value = toCoin(v.value as bigint);
      v.suffix = ` ${props.token.symbol}`;
    } else if (v.key === "percentageOfEarnings") {
      v.suffix = "%";
    } else if (typeof v.value === "boolean") {
      v.value = v.value ? "YES" : "NO";
    }
  });
  return result;
});
</script>

<style lang="scss" scoped>
@use "../../styles/art.scss" as *;

.details {
  font-size: 30px;
  font-weight: 600;
  line-height: 1;

  @include mobile {
    font-size: 16px;
    border: 1px solid #f3f3f3;
    box-shadow: 0px 25px 40px rgba(18, 17, 39, 0.08);
    border-radius: 20px;
    padding: 0 20px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    @include mobile {
      margin-block-start: 1em;
      margin-block-end: 1em;
    }
  }
}

.value,
.suffix {
  color: var(--el-color-primary);
}

.divider {
  margin: unset;
  border-color: #f3f3f3;
}
</style>
