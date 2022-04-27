import { computed } from "vue";
import * as VueI18n from "vue-i18n";
import { store } from "./store";

const i18nInfoGetter = {
  locale: computed(() => store.state.i18n.locale),
};

export const i18n = VueI18n.createI18n({
  locale: i18nInfoGetter.locale.value,
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: {
      title: { _1: "Sharing your content,", _2: "in a whole new way." },
      subTitle: {
        _1: "We are the creators,",
        _2: "We are the sharers,",
        _3: "We are the beneficiaries.",
      },
      navs: {
        home: "Home",
        publish: "Publish",
        collection: "Collection",
        wiki: "Wiki",
        market: "Market",
      },
      btn: {
        close: "Close",
      },
      language: "English",
      copyright: "© 2021 EaseShare. All rights reserved.",
      hint: {
        loading: "Loading...",
      },
    },
    "zh-CN": {
      title: { _1: "以全新方式，", _2: "自由分享你的内容。" },
      subTitle: {
        _1: "我们是创作者，",
        _2: "我们是分享者，",
        _3: "我们是受益者。",
      },
      navs: {
        home: "首页",
        publish: "发布",
        collection: "收藏",
        wiki: "Wiki",
        market: "市场",
      },
      btn: {
        close: "关闭",
      },
      language: "简体中文",
      hint: {
        loading: "加载中...",
      },
    },
  },
});

const i18nOperator = {
  async changeLocale(locale: "en" | "zh-CN") {
    (i18n.global.locale.value = locale), store.commit("i18n/setLocale", locale);
    await store.dispatch("i18n/save");
  },
};

export const t = i18n.global.t;
export const locale = i18n.global.locale;

export function changeLocale(locale: "en" | "zh-CN") {
  i18nOperator.changeLocale(locale);
}
