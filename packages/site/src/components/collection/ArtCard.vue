<template>
  <el-card class="art-card" shadow="hover">
    <el-image
      v-if="coverUrl !== 'Loading'"
      :src="coverUrl"
      fit="cover"
      class="img"
    />
    <el-image class="img" v-else>
      <template #error>
        <div class="image-slot">{{ t("hint.loading") }}</div>
      </template>
    </el-image>
    <div class="content">
      <p class="title">{{ title }}</p>
      <p class="sub-title">{{ description }}</p>
      <div class="bottom">
        <el-button
          class="enter"
          type="text"
          @click="
            router.push({
              name: 'art',
              params: { chainId: web3InfoGetter.chain.id.value, nftId },
            })
          "
          >{{ t("view") }}</el-button
        >
        <span>NFT ID: {{ nftId }}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { web3InfoGetter } from "../../store";

const { t } = useI18n({
  messages: { en: { view: "View" }, "zh-CN": { view: "查看" } },
});

defineProps<{
  coverUrl: string;
  title: string;
  description: string;
  nftId: string;
}>();

const router = useRouter();
</script>

<style lang="scss" scoped>
.art-card {
  width: 300px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  :deep(.el-card__body) {
    padding: unset;
  }
}

.img {
  width: 100%;
  height: 200px;
  & > :deep(img) {
    height: auto;
  }
}

.image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-border-color-extra-light);
}

.title {
  font-weight: bold;
  font-size: var(--el-font-size-large);
  margin-block-start: 1em;
  margin-block-end: 0;
}

.sub-title {
  color: var(--el-color-info);
}

.content {
  padding: 0px 20px 20px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.enter {
  font-size: var(--el-font-size-large);
  font-weight: bold;
}
</style>
