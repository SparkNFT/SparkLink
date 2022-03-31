<template>
  <section id="benefits" :class="{ mobile: !grid.sm }">
    <div class="inner">
      <h2 class="title">{{ t("title") }}</h2>
      <div class="container">
        <el-image src="/assets/how-to-benefit/plane.svg" class="plane no-user-select"></el-image>
        <div
          v-for="(description, index) in descriptions"
          :key="description.title"
          :class="[`description`, `_${index + 1}`]"
        >
          <div class="text">
            <h3>{{ description.title }}</h3>
            <p>{{ description.value }}</p>
          </div>
          <el-image
            :src="`/assets/how-to-benefit/block-${index + 1}.svg`"
            :class="[`image`, `no-user-select`]"
          ></el-image>
          <template v-if="grid.sm">
            <el-image
              v-if="index === 1"
              src="/assets/how-to-benefit/line-1.svg"
              :class="[`line`, `_1`, `no-user-select`]"
            ></el-image>
            <el-image
              v-if="index === 1"
              src="/assets/how-to-benefit/line-2.svg"
              :class="[`line`, `_2`, `no-user-select`]"
            ></el-image>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { grid } from "../../grid";

const { t } = useI18n({
  messages: {
    en: {
      title: "How to benefit?",
      descriptions: [
        {
          title: "Content Publish",
          value:
            "Click the publish button to create your own  work in the form of NFT. There is no limit to the content or form of the work. ",
        },
        {
          title: "Click To Share",
          value:
            "Any creator or sharer is allowed to share their node content directly or indirectly by sharing posters or sharing links, and share their node content to any place for dissemination or sale. ",
        },
        {
          title: "Earning Income",
          value:
            "By sharing and selling subordinate nodes of their works, creators can permanently obtain the copyright income and profit share of all subordinate nodes of this node. Each child node can permanently get the profit share of all subordinate nodes of this node by selling the subordinate nodes again. When the subordinate nodes of the works are sold, holders can directly claim income on NFT detail page to personal wallet.",
        },
      ],
    },
    "zh-CN": {
      title: "如何收益？",
      descriptions: [
        {
          title: "创作内容",
          value:
            "点击发布按钮，以NFT的形式创作自己的作品，作品内容或形式无限制。",
        },
        {
          title: "点击分享",
          value:
            "任何创作者或者分享者可以通过分享海报或分享链接将属于自己的节点分享到任何地方，直接或者间接的传播内容。",
        },
        {
          title: "获得收益",
          value:
            "创作者通过分享和出售自己作品的下级节点永久获取节点收益，分享者通过再次分享和出售已有作品的下级节点永久获得抽成收益。当作品的下级节点被出售后，可以直接在作品收藏界面领取收益至个人钱包内。",
        },
      ],
    },
  },
});

interface IDescription {
  title: string;
  value: string;
}
const descriptions = computed(() => [0, 1, 2].map((i) => ({
  title: t(`descriptions[${i}].title`),
  value: t(`descriptions[${i}].value`),
})) as IDescription[])
</script>

<style lang="scss" scoped>
@use "../../styles/index.scss";

#benefits {
  background-color: var(--grey-background);
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 0;
  .inner {
    @include index.block;
    max-width: 1344px;
    box-sizing: border-box;
    padding: 0 50px;
    align-items: center;
    margin-bottom: 100px;

    .title {
      @include index.index-title;
    }
  }
}

.container {
  position: relative;
}

.description {
  display: flex;
  align-items: center;
  position: relative;
  & > div {
    height: fit-content;
  }
  h3 {
    font-size: 30px;
  }
  p {
    color: var(--el-color-info);
    font-size: var(--el-font-size-large);
  }
  &._1 {
    & > .text {
      margin-right: 150px;
      flex: 1.4;
      margin-top: -80px;
    }
    .image {
      flex: 1;
    }
  }

  &._2 {
    flex-direction: row-reverse;
    & > .text {
      margin-left: 150px;
      flex: 8;
    }
    .image {
      flex: 6;
    }
  }

  &._3 {
    & > .text {
      margin-right: 150px;
      flex: 1.5;
    }
    .image {
      flex: 1;
    }
  }
}

.mobile {
  .plane {
    display: none;
  }
  .description {
    padding-bottom: 24px;
    h3 {
      font-size: 24px;
      margin-top: 0px;
    }
    &._1,
    &._2,
    &._3 {
      flex-direction: column;
      & > .text {
        margin: 0px;
      }
    }
  }
}

.plane {
  position: absolute;
  top: 0px;
  left: 45%;
}

.image {
  z-index: 10;
}

.line {
  position: absolute;

  z-index: 0;
  &._1 {
    left: 30%;
    width: 50%;
    top: -40%;
  }
  &._2 {
    left: 30%;
    bottom: -30%;
    width: 40%;
  }
}
</style>
