// https://nuxt.com/docs/api/configuration/nuxt-config
import { quasar } from "@quasar/vite-plugin";
import messages from "./i18n";

const URL_DEV = "https://test.energymarket.uz/";
// const URL_DEV = "https://energymarket.uz/";
// const URL_DEV = "https://dev-new.marketplace.taqsim.uz/";
const URL_PROD = URL_DEV;

const isDev = process.env.NODE_ENV === "development";

function ruCustomRule(choice: any, choicesLength: any) {
  if (choice === 0) return 0;

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;
  if (!teen && endsWithOne) return 1;
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;

  return choicesLength < 4 ? 2 : 3;
}
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: isDev ? URL_DEV : URL_PROD,
    },
  },
  build: {
    transpile: ["quasar"],
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@nuxt/image-edge",
  ],
  image: {
    domains: ["energymarket.uz", "test.energymarket.uz"],
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "uz-latn",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    vueI18n: {
      locale: "uz-latn",
      pluralRules: {
        ru: ruCustomRule,
      },
      messages,
      legacy: false,
    },
    locales: [
      {
        code: "ru",
        name: "Русский",
        shortName: "Рус",
        icon: "/images/lang/ru.png",
      },
      {
        code: "uz-latn",
        name: "O'zbekcha",
        shortName: "O'zb",
        icon: "/images/lang/uz.png",
      },
      {
        code: "uz",
        name: "Ўзбекча",
        shortName: "Ўзб",
        icon: "/images/lang/uz.png",
      },
    ],
  },
  css: ["@/assets/styles/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      quasar({
        sassVariables: "assets/styles/quasar-variables.scss",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  },
});
