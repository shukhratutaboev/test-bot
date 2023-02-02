export const PHONE_PREFIX = "+998";

export function trimBetween(val: string | null) {
  if (!val) return val;
  const res = val.toString().replace(/\s+/g, "");
  if (isNaN(+res)) return res;
  return res;
}

let resetTimeout: ReturnType<typeof setTimeout>;
export function resetValidation(refValue: object | null, timeout = 0) {
  clearTimeout(resetTimeout);

  resetTimeout = setTimeout(() => {
    // refValue?.resetValidation();
  }, timeout);
}

export function sleep(time: number) {
  return new Promise((res, rej) => setTimeout(res, time));
}
