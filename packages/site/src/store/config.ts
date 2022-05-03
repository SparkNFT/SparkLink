import type { Module } from "vuex";

export interface IConfig {
  frontendBaseUrl: string;
}

export const configStore = {
  namespaced: true,
  state() {
    return {
      frontendBaseUrl: process.env.FRONTEND_BASE_URL ?? "https://sparklink.io",
    };
  },
} as Module<IConfig, any>;
