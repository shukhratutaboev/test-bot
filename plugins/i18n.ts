let i18n = null;

export { i18n };

export default defineNuxtPlugin((nuxtApp) => {
  i18n = nuxtApp.$i18n;
});
