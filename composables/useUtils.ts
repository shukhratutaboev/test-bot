import { useQuasar, debounce, date } from "quasar";
const { addToDate } = date;

export const useUtils = () => ({
  onValidationError() {},
  deepCopy() {},
  ACCEPT_IMAGE_TYPES: ".jpeg,.jpg,.png",
  phonePrefix: "+998",
  phoneNumber: "998770701232",
  phoneNumber2: "998781221232",
  useQuasar,
  debounce,
  addToDate,
  formatPhoneNumber(v: string) {
    if (!v) return v;
    let res = v.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 ($2) $3-$4-$5"
    );

    if (!res?.startsWith("+")) res = "+" + res;
    return res;
  },
  prettify(v: number | string | null): string {
    if (!v) return "";

    const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;

    return v.toString().replace(regExp, "$1 ").toString();
  },
  round(num: number) {
    return Math.round((+num + Number.EPSILON) * 100) / 100;
  },
  trimBetween(val: string | null): string {
    if (!val) return "";
    const res = val.replace(/\s+/g, "");
    return res.toString();
  },

  formatDate(strDate: string, format = "DD.MM.YYYY") {
    if (!strDate) return "";
    let newDate = null;
    try {
      newDate = new Date(strDate.replace(/\s/, "T").replace(/Z/, "") + "Z");
      if (newDate.toString() === "Invalid Date") {
        return date.formatDate(date.extractDate(strDate, "DD.MM.YYYY"), format);
      }
    } catch (e) {
      return date.formatDate(strDate, format);
    }

    return date.formatDate(newDate, format);
  },
  scrollTo(top: number) {
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
  },
});
