import { Module } from "vuex";

export interface II18nInfo {
  locale: "en" | "zh-CN";
}

const i18nInfoOperator = {
  localStorage: {
    localeStr: "locale",
    retrieve() {
      const storage = window.localStorage;
      return { locale: storage.getItem(this.localeStr) ?? "en" } as II18nInfo;
    },
    store(payload: II18nInfo) {
      window.localStorage.setItem(this.localeStr, payload.locale);
    },
  },
};

export const i18nInfoStore = {
  namespaced: true,
  state() {
    return i18nInfoOperator.localStorage.retrieve();
  },
  mutations: {
    setLocale(state, value) {
      state.locale = value;
    },
  },
  actions: {
    save(context) {
      i18nInfoOperator.localStorage.store(context.state);
    },
  },
} as Module<II18nInfo, any>;
