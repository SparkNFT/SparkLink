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
          >{{ t("view") }}
        </el-button>
      </div>
      <p class="nft-id">NFT ID: {{ nftId }}</p>
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
  width: 489px;
  height: 773px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #f3f3f3;
  box-shadow: 0 45px 55px rgba(18, 17, 39, 0.08);
  border-radius: 20px;

  :deep(.el-card__body) {
    padding: unset;
  }
}

.img {
  width: 100%;
  height: 498px;
  display: flex;
  align-items: center;
  background: #e2c8ce;
  border-radius: 20px;

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
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  color: #2c2f30;
}

.sub-title {
  margin-bottom: 19px;
  font-weight: 400;
  font-size: 20px;
  line-height: 180%;
  text-align: center;
  color: #8d8d97;
}

.content {
  height: 284px;
  padding: 34px 0 36px 0;
  text-align: center;
}

.bottom {
  margin-bottom: 23px;
}

.enter {
  width: 261px;
  height: 65px;
  color: white;
  font-weight: bold;
  background: #ef7a61;
  border-radius: 10px;

  &:hover {
    color: #ff6e65;
    background: #ffea07;
    border-color: #ffea07;
  }
}

.nft-id {
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #4d4d4d;
}
</style>
