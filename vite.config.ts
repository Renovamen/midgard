import path from "node:path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      vue: "vue/dist/vue.esm-bundler.js"
    }
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      dts: "src/typed-router.d.ts"
    }),

    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", VueRouterAutoImports],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/stores"],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: "src/components.d.ts"
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss()
  ]
});
