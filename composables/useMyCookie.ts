const KEY = "token";

export const useMyCookie = () => {
  const token = useCookie(KEY);

  return {
    getAccessToken() {
      return token.value || null;
    },
    getLocale() {
      const locale = useCookie("i18n_redirected").value;
      return locale === "uz" ? "uz-Cyrl" : locale;
    },
    setAccessToken(v: any) {
      token.value = v;
    },
  };
};
