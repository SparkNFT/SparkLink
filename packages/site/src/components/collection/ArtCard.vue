<template>
  <div>
    <p v-if="inMobile" class="nft-id">NFT ID: {{ nftId }}</p>
    <div class="art-card" shadow="hover">
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
        <p v-if="!inMobile" class="nft-id">NFT ID: {{ nftId }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { web3InfoGetter } from "../../store";
import { collection } from "../../states";

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

const inMobile = collection.inMobile;
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/common/var" as *;
@use "element-plus/theme-chalk/src/mixins/mixins" as *;

@mixin mobile() {
  @include res("sm-and-down", $breakpoints-spec) {
    @content;
  }
}

.art-card {
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
  display: flex;
  align-items: center;
  background: #e2c8ce;
  border-radius: 20px;

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  > :deep(*) {
    position: absolute;
    top: 0;
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

  @include mobile {
    font-size: var(--el-font-size-medium);
    margin-bottom: unset;
    line-height: unset;
  }
}

.sub-title {
  margin-bottom: 19px;
  font-weight: 400;
  font-size: 20px;
  line-height: 180%;
  text-align: center;
  color: #8d8d97;

  @include mobile {
    font-size: 10px;
    margin-bottom: 8px;
  }
}

.content {
  padding: 34px 0 36px 0;
  text-align: center;

  @include mobile {
    padding: 12px 0 0;
  }
}

.bottom {
  margin-bottom: 23px;

  @include mobile {
    margin-bottom: 0;
  }
}

.enter {
  width: 261px;
  height: 65px;
  color: white;
  font-weight: bold;
  background: #ef7a61;
  border-radius: 10px;

  @include mobile {
    width: 100%;
    border-radius: 40px;
    height: 40px;
    :deep(span) {
      font-size: 12px;
    }
  }

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

  @include mobile {
    font-size: 8px;
    line-height: unset;
    margin-block-end: 4px;
    color: var(--el-color-primary);
  }
}
</style>
