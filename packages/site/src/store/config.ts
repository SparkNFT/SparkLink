import type { Module } from "vuex";

export interface IConfig {
  frontendBaseUrl: string;
}

export const configStore = {
  namespaced: true,
  state() {
    console.log(process.env);
    return {
      frontendBaseUrl:
        process.env.FRONTEND_BASE_URL ?? "https://codeatnow.github.io/TestPage",
    };
  },
} as Module<IConfig, any>;
