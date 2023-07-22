import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";

export default defineConfig({
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    [
      "btn",
      "rounded-sm border bg-transparent text-white text-center cursor-pointer duration-200"
    ]
  ],
  theme: {
    colors: {
      // ui
      background: "#47485c",
      active: "#377bb5",
      label: "#6d7083",
      trash: "#507c59",
      item: "#232731",
      // map
      road: "#c3944e",
      stick: "#51963d",
      event: "#539ad8",
      chest: "#6e4633",
      hero: "#886bfa"
    },
    fontFamily: {
      ui: "mainfont, -apple-system, Helvetica Neue, Arial, Noto Sans, sans-serif"
    },
    boxShadow: {
      inbox: "0px 0px 4px #eee inset",
      "inbox-sm": "0px 0px 2px #eee inset"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "sub"
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
