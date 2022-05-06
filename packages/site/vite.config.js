import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
const getDefine = () => {
  const result = {
    "process.env": {
      KEY_SERVER_BASE_URL: process.env.KEY_SERVER_BASE_URL,
      FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
      DEBUG: process.env.DEBUG,
    },
  };
  if (process.env.DEBUG) result["global"] = "globalThis";
  else result["global.WebSocket"] = "globalThis.WebSocket";
  //if (process.env.DEBUG) result["global"] = {};
  console.log(process.env.DEBUG);
  return result;
};

const getPlugin = () => {
  const result = [
    vue(),
    inspect(),
    process.env.DEBUG
      ? null
      : { ...commonjs({ transformMixedEsModules: true }), enforce: "pre" },
    { ...inject({ Buffer: ["buffer", "Buffer"] }), enforce: "post" },
    { ...builtins({ crypto: true }), enforce: "post" },
  ];
  return result.filter((value) => !!value);
};

function inspect() {
  return {
    name: "rollup-inspect",
    // DO NOT DELETE THIS!
    options: function (config) {
      let c = null,
        inspect = null;
      if (process.env.DEBUG) return;
      const plugins = config.plugins.reduce((arr, plugin) => {
        if (plugin.name === "commonjs") {
          if (c) plugin = c;
          else {
            c = plugin;
            plugin = null;
          }
        }
        if (plugin?.name === "rollup-inspect") {
          inspect = plugin;
        }
        if (plugin) arr.push(plugin);
        return arr;
      }, []);
      //plugins.push(inspect)
      const result = { ...config, plugins };
      return result;
    },
    enforce: "post",
  };
}

export default defineConfig({
  plugins: getPlugin(),
  build: {
    ssr: false,
    sourcemap: true,
    target: "esnext",
    rollupOptions: {
      output: {
        globals: {
          global: {},
        },
      },
    },
  },
  define: getDefine(),
  optimizeDeps: {
    include: ["buffer", "lodash"],
  },
});
