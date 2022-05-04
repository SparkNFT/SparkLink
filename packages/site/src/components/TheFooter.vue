/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <el-footer id="footer">
    <div class="item-container">
      <div v-if="grid.md" class="description">
        <section>
          <img src="/assets/color-logo.png" class="logo" />
          <p class="description-text">
            {{ t("description") }}
          </p>
          <p
            v-for="share in shareLinks"
            :key="share.target"
            class="share"
            @click="openShareTarget(share.target)"
          >
            <i :class="share.icon" />
          </p>
        </section>
      </div>
      <div v-else class="subscription">
        <el-button size="large" class="button" color="#FFE177" round>
          <i class="iconfont icon-telegram" style="margin-right: 8px;"></i>
          <span class="text">{{ t("subscription._1") }}</span>
        </el-button>
        <p>{{ t("subscription._2") }}</p>
      </div>
      <div class="others">
        <template v-if="grid.md">
          <Navigation
            v-for="nav in navs"
            :key="nav.title"
            :title="nav.title"
            :items="nav.items"
            style="flex: 1"
          ></Navigation>
        </template>
        <template v-else>
          <div v-for="(navs, index) in mobileNavs" :key="index" class="nav-row">
            <Navigation
              v-for="{ title, items } in navs"
              :key="title"
              :title="title"
              :items="items"
              style="width: 110px"
            ></Navigation>
          </div>
        </template>
      </div>
    </div>
    <div class="email-container hidden-sm-and-down">
      <el-input v-model="email" placeholder="info@sparklink.io" />
      <el-button type="warning" class="send" @click="handleMailAddressClick">
        {{ t("contact_us") }}
      </el-button>
    </div>
    <p v-if="grid.md" class="rights">{{ t("rights") }}</p>
    <div v-else class="rights-area">
      <img src="/assets/color-logo.png" class="logo" />
      <p class="rights">{{ t("rights") }}</p>
    </div>
  </el-footer>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import Navigation from "./footer/Navigation.vue";
import type { IFooterNavItem, IFooterNavItemUsingIcon } from "./types";
import { grid } from "../grid";

const { t } = useI18n({
  messages: {
    en: {
      description: "Unique content publishing and distribution protocol",
      subscription: {
        _1: "Subscribe to learn more",
        _2: "Get the latest news of Sparklink!",
      },
      items: {
        navigation: "NAVIGATION",
        resources: "RESOURCES",
        people: "People",
        market: "MARKET",
        getInTouch: "Get in touch",
      },
      navs: {
        resources: {
          condition: "Conditions",
          privacyPolicy: "Privacy Policy",
        },
        market: {
          openSea: "OpenSea",
        },
      },
      contact_us: "CONTACT US",
      copy_email_address_success: "copy email address success",
      rights: "© Sparklink 2021. All rights reserved.",
    },
    "zh-CN": {
      copy_email_address_success: "邮箱地址复制成功",
      items: {
        navigation: "导航",
      },
    },
  },
});

interface INav {
  title: string;
  items: IFooterNavItem[];
}

const shareLinks = reactive([
  {
    target: "https://t.co/xM7bzslqZ8",
    icon: "iconfont icon-discord",
    name: "discord",
  },
  {
    target: "https://t.co/Ngpm0LKQDP",
    icon: "iconfont icon-telegram",
    name: "telegram",
  },
  {
    target: "https://medium.com/@SparkLink",
    icon: "iconfont icon-medium",
    name: "medium",
  },
  {
    target: "https://twitter.com/SparkLink_io",
    icon: "iconfont icon-twitter",
    name: "twitter",
  },
]);

const navs = computed(
  () =>
    [
      {
        title: t("items.navigation"),
        items: [
          { name: t("navs.home"), routeName: "index" },
          { name: t("navs.publish"), routeName: "publish" },
          { name: t("navs.collection"), routeName: "collection" },
          { name: t("wiki"), routeName: "wiki" },
        ],
      },
      {
        title: t("items.resources"),
        items: [
          { name: t("navs.resources.condition"), routeName: "index" },
          { name: t("navs.resources.privacyPolicy"), routeName: "index" },
        ],
      },
      {
        title: t("items.market"),
        items: [{ name: t("navs.market.openSea"), routeName: "index" }],
      },
    ].map((v) => {
      const items = v.items.map(
        (v) =>
          ({ name: v.name, route: { name: v.routeName } } as IFooterNavItem)
      );
      return { title: v.title, items };
    }) as INav[]
);

const mobileNavs = computed(
  () =>
    [
      [navs.value[0], navs.value[1]],
      [
        navs.value[2],
        {
          title: t("items.getInTouch"),
          items: [shareLinks[3], shareLinks[1]].map((v) => ({
            icon: v.icon,
            route: { name: v.name },
          })),
        },
      ],
    ] as INav[][]
);

let email = ref("");

function openShareTarget(e: string) {
  window.open(e);
}

function handleMailAddressClick() {
  navigator.clipboard.writeText("info@sparklink.io").then(() => {
    ElMessage({ type: "success", message: t("copy_email_address_success") });
  });
}
</script>

<style lang="scss" scoped>
@use "element-plus/theme-chalk/src/mixins/mixins" as *;
@use "element-plus/theme-chalk/src/common/var" as *;

#footer {
  position: relative;
  height: auto;
  background: linear-gradient(
      203.56deg,
      rgba(255, 255, 255, 0.2) 14.77%,
      rgba(255, 248, 235, 0.18125) 21.72%,
      rgba(0, 0, 0, 0) 80.72%
    ),
    linear-gradient(230.61deg, #fecc80 1.01%, #f77878 27.21%, #56557e 87.73%);
  box-sizing: border-box;

  @include res("md-and-up", $breakpoints-spec) {
    height: 559px;
  }

  .item-container {
    display: flex;
    justify-content: space-between;

    @include res("md-and-up", $breakpoints-spec) {
      margin-top: 94px;
      margin-left: 118px;
    }

    @include res("sm-and-down", $breakpoints-spec) {
      margin: 75px 0 0;
      flex-direction: column;
    }

    .title {
      margin: 0 0 40px 0;
      color: #ffea07;
      font-size: 28px;
      font-weight: 800;
      line-height: 30px;
      text-align: left;
    }
  }

  .email-container {
    position: absolute;
    width: 547px;
    height: 82px;
    bottom: 134px;
    right: 118px;

    ::v-deep(.el-input) {
      height: 100%;
    }

    ::v-deep(.el-input__inner) {
      height: 100%;
      border-radius: 15px;
      padding: 22px 42px;
      font-size: 24px;
    }

    .send {
      position: absolute;
      width: 153px;
      height: 73px;
      background: #ef7a61;
      right: 7px;
      bottom: 4px;
      border-radius: 15px;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 29px;
      text-align: center;

      &:hover {
        color: #ff6e65;
        background: #ffea07;
        border-color: #ffea07;
      }
    }
  }
}

.description,
.others {
  flex: 1;
}

.description {
  max-width: 310px;
  .logo {
    width: 165px;
    height: 38px;
  }

  .description-text {
    margin: 30px 0 30px 0;
    color: white;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    text-align: left;
  }

  .share {
    display: inline-block;
    margin: 0 23px 0 0;
    width: 32px;
    height: 32px;
    color: #666;
    cursor: pointer;
    border-radius: 16px;
    border: none;
    background-color: white;
    text-align: center;

    &:hover {
      background-color: #ffea07;
    }

    i {
      line-height: 32px;
    }
  }

  button + button {
    margin-left: 24px;
  }
}

.subscription {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  --el-border-radius-round: 14px;
  p {
    color: white;
    margin-bottom: 50px;
  }
  .button {
    height: 52px;
    --el-button-text-color: var(--el-color-primary);
    font-weight: bold;
    filter: drop-shadow(0px 8px 15px rgba(68, 42, 42, 0.46));
  }

  .iconfont {
    font-size: 26px;
    vertical-align: sub;
  }
}

.others {
  display: flex;
  justify-content: space-between;

  flex-wrap: wrap;
  @include res("md-and-up", $breakpoints-spec) {
    justify-content: right;
  }
  @include res("sm-and-down", $breakpoints-spec) {
    justify-content: center;
  }
}

.nav-row {
  width: 100%;
  display: flex;
  margin-bottom: 60px;
  justify-content: space-around;
}

.rights-area {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 60px;
  .logo {
    height: 21px;
  }
}

.rights {
  color: #d9dbe1;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;

  @include res("md-and-up", $breakpoints-spec) {
    position: absolute;
    bottom: 26px;
    left: 165px;
  }

  @include res("sm-and-down", $breakpoints-spec) {
  }
}
</style>
