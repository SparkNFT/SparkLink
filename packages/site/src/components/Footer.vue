<template>
  <el-footer id="footer" :class="{ mobile: !grid.sm }">
    <div class="block _1"></div>
    <div class="block _2"></div>
    <div class="block _3"></div>
    <div v-if="grid.sm" class="container-wrapper">
      <div class="container _1">
        <div class="description">
          <el-image src="/assets/main-logo.svg" class="logo"></el-image>
          <p class="text">
            {{ t("subTitle._1") }}<br />
            {{ t("subTitle._2") }} <br />
            {{ t("subTitle._3") }} <br />
          </p>
          <div class="btn-container">
            <a href="https://twitter.com/EaseShare_NFT" target="_blank">
              <el-image src="/assets/icons/twitter.svg" />
            </a>
            <a href="https://t.me/Easeshare" target="_blank">
              <el-image src="/assets/icons/telegram.svg" />
            </a>
          </div>
        </div>
        <div class="nav">
          <div v-for="nav in navs" :key="nav.title" class="nav-column">
            <h3 class="title">{{ nav.title }}</h3>
            <router-link
              v-for="item in nav.navs"
              :key="item.name"
              :to="{ name: item.routeName }"
              class="item"
              >{{ item.name }}</router-link
            >
          </div>
        </div>
      </div>
      <div class="container _2">
        <p class="text">{{t("copyright")}}</p>
      </div>
    </div>
    <div v-else class="container-wrapper">
      <div class="container _1">
        <div class="nav">
          <div v-for="nav in navs" :key="nav.title" class="nav-column">
            <h3 class="title">{{ nav.title }}</h3>
            <router-link
              v-for="item in nav.navs"
              :key="item.name"
              :to="{ name: item.routeName }"
              class="item"
              >{{ item.name }}</router-link
            >
          </div>
        </div>
        <div class="nav">
          <div class="nav-column">
            <h3 class="title">{{t("title.getInTouch")}}</h3>
            <div class="btn-container">
              <a href="https://twitter.com/EaseShare_NFT" target="_blank">
                <el-image src="/assets/icons/twitter.svg" />
              </a>
              <a href="https://t.me/Easeshare" target="_blank">
                <el-image src="/assets/icons/telegram.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container _2">
        <el-image src="/assets/main-logo.svg" class="logo"></el-image>
        <p class="text">{{t("copyright")}}</p>
      </div>
    </div>
  </el-footer>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { grid } from "../grid";
import {computed} from "vue";

const { t } = useI18n({
  messages: {
    en: { title: { navigation: "Navigation", getInTouch: "Get in touch" } },
    "zh-CN": { title: { navigation: "导航", getInTouch: "联系我们" } },
  },
});

interface INav {
  name: string;
  routeName: string;
}

interface INavGroup {
  title: string;
  navs: INav[];
}

const navs = computed(()=> [
  {
    title: t("title.navigation"),
    navs: [
      { name: t("navs.home"), routeName: "index" },
      { name: t("navs.publish"), routeName: "publish" },
      { name: t("navs.collection"), routeName: "collection" },
      { name: t("wiki"), routeName: "wiki" },
    ],
  },
] as INavGroup[]);
</script>

<style lang="scss" scoped>
#footer {
  background-color: var(--grey-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  position: relative;
  overflow: hidden;
  z-index: 0;
}
.container-wrapper {
  width: 100%;
  position: relative;
  z-index: 10;
}
.container {
  max-width: 1344px;
  display: flex;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  &._1 {
    .btn-container {
      display: flex;
      height: 18px;
      gap: 16px;
    }
  }
  &._2 {
    margin-top: unset;
    margin-bottom: 26px;
  }
  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    flex-grow: 1;
  }
  .nav {
    margin-top: 40px;
    > .nav-column {
      > .title {
        margin-block: unset;
      }
      > .item {
        text-decoration: none;
        color: var(--el-color-info);
      }
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  }
}

.logo {
  height: 52px;
  margin-left: -14px;
}

.text {
  font-size: var(--el-font-size-medium);
  color: var(--el-color-info);
  margin-bottom: unset;
}
.block {
  position: absolute;
  z-index: 1;
  opacity: 0.4;
  filter: blur(30px);
  border-radius: 50%;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  &._1 {
    width: 360px;
    background: conic-gradient(
      from 168.09deg at 50% 50%,
      #deff9e -160.13deg,
      rgba(128, 255, 253, 0.5) 42.37deg,
      #deff9e 199.87deg,
      rgba(128, 255, 253, 0.5) 402.37deg
    );
    transform: rotate(-144.4deg);
    top: -180px;
    left: 0;
  }
  &._2 {
    width: 500px;
    background: conic-gradient(
      from 168.09deg at 50% 50%,
      #66ffe6 -160.13deg,
      rgba(255, 128, 250, 0.6) 42.37deg,
      #66ffe6 199.87deg,
      rgba(255, 128, 250, 0.6) 402.37deg
    );
    transform: rotate(97.38deg);
    left: -150px;
    bottom: -360px;
  }

  &._3 {
    width: 800px;
    background: conic-gradient(
      from 168.09deg at 50% 50%,
      #66ffe6 -160.13deg,
      rgba(128, 147, 255, 0.6) 42.37deg,
      #66ffe6 199.87deg,
      rgba(128, 147, 255, 0.6) 402.37deg
    );
    transform: rotate(-44.13deg);
    right: -200px;
    top: -400px;
  }
}

.mobile {
  .block {
    &._1 {
      width: 100px;
      top: -50px;
    }
    &._2 {
      width: 200px;
      left: -30px;
      bottom: 20px;
    }

    &._3 {
      width: 200px;
      top: 50px;
      right: -50px;
    }
  }

  .container {
    justify-content: space-between;
    padding: 0 20px;
    &._2 {
      margin-top: 24px;
      padding: unset;
      align-items: center;
      .logo {
        max-width: 150px;
      }
      .text {
        font-size: var(--el-font-size-extra-small);
        height: fit-content;
      }
    }
  }
  .nav {
    margin-top: unset;
  }
}
</style>
