import type { Module } from "vuex";

export interface IConfig {
  frontendBaseUrl: string;
}

export const configStore = {
  namespaced: true,
  state() {
    console.log(process.env);
    return {
      frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? "https://easeshare.io",
    };
  },
} as Module<IConfig, any>;
