<template>
  <section id="mechanism">
    <h2 class="how-we-work">{{ t("title") }}</h2>
    <el-image src="/assets/mechanism.png" />
    <p class="description">
      {{ t("description") }}
    </p>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({
  messages: {
    en: {
      title: "How we work?",
      description:
        "The unique tree-shaped sharing economy structure allows everyone to share" +
        "their own works while generating a split-type positive economic reward.",
    },
    "zh-CN": {
      title: "如何运行？",
      description:
        "独特的树状共享经济结构允许每个人分享作品以及节点内容，产生分裂式的正向经济收益。",
    },
  },
});
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#mechanism {
  padding: 0 50px 66px;
  max-width: 1344px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .how-we-work {
    @include index.index-title;
  }

  .description {
    margin-top: 36px;
    color: var(--el-color-info);
    max-width: 700px;
    text-align: center;
  }
}
</style>
