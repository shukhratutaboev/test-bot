import { trimBetween } from './helpers';
import { i18n } from '~~/plugins/i18n';

const regExp = {
  password: /^[\w.!@#$%^&*=-|\/]{6,}$/,
  string: /^[a-zA-Zа-яА-Я]/,
  latin: /^[a-zA-Z]/,
  number: /^[0-9.]*$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/,
  time: /^([0-1]?\d|2[0-3]):[0-5]\d$/,
  fulltime: /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  timeOrFulltime: /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
  tag: /(<([^>]+)>)/gi,
};

export default {
  required: {
    validator: (_, v) =>
      !!trimBetween(v) || new Error(i18n.t('rules.required')),
  },
  phone: {
    validator: (_, v) => {
      v = trimBetween(v);
      if (!v) return true;
      return (
        v?.toString()?.length === 9 ||
        new Error(i18n.t('enter_the_correct_phone_number'))
      );
    },
  },
  // is_null: (_, v) => v !== null || t("rules.required"),
  // number: (v) =>
  //   !v || regExp.number.test(Math.abs(trimBetween(v))) || t("rules.integer"),
  // integer: (v) =>
  //   !v || Number(v) === parseInt(trimBetween(v)) || t("rules.integer"),
  // float: (v) =>
  //   !v || Number(v) === parseFloat(trimBetween(v)) || t("rules.float"),
  // email: (v) => regExp.email.test(v) || t("rules.email"),
  // positive: (v) => Number(trimBetween(v)) >= 0 || t("rules.positive"),
  // min_string: (v, n) =>
  //   trimBetween(v).toString().length >= n || t("rules.min_string", { n }),
  // max_string: (v, n) =>
  //   trimBetween(v).toString().length <= n || t("rules.max_string", { n }),
  // max100: (v) => Number(trimBetween(v)) <= 100 || t("rules.max", { n: 100 }),
  // date: (v) => regExp.date.test(v) || t("rules.date"),
  // time: (v) => regExp.time.test(v),
  // string: (v) => regExp.string.test(v) || t("rules.string"),
  // fulltime: (v) => regExp.fulltime.test(v),
  // timeOrFulltime: (v) => regExp.timeOrFulltime.test(v),
  // password: (v) => regExp.password.test(v) || t("rules.password"),
  // latin: (v) => regExp.latin.test(v) || t("rules.latin"),
  // tag: (v) => !regExp.tag.test(v) || t("rules.tag"),
  // unique: (data, v, fieldName) => {
  //   const res = data.filter((el) => el[fieldName] === v);
  //   return res?.length === 1 || t("rules.unique");
  // },
  // same_password: (data, password_key, v) => {
  //   return data[password_key] === v || t("password_mismatch");
  // },
};
