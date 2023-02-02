<script setup>
import validate from "@/utils/validate";

const { round, trimBetween } = useUtils();
const { t } = useI18n();

const dialog = ref(false);

const region = ref(null);
const price = ref(null);

const regionsList = [
  { id: 1, label: t("regions.Tashkent"), value: 1497.5 },
  { id: 2, label: t("regions.Tashkent_region"), value: 1497.5 },
  { id: 3, label: t("regions.Jizzakh"), value: 1461 },
  { id: 4, label: t("regions.Samarkand"), value: 1607 },
  { id: 5, label: t("regions.Navoi"), value: 1643 },
  { id: 6, label: t("regions.Bukhara"), value: 1607 },
  { id: 7, label: t("regions.Karshi"), value: 1607 },
  { id: 8, label: t("regions.Termez"), value: 1643 },
  { id: 9, label: t("regions.Namangan"), value: 1387 },
  { id: 10, label: t("regions.Fergana"), value: 1277.5 },
  { id: 11, label: t("regions.Andijan"), value: 1350.5 },
  { id: 12, label: t("regions.Nukus"), value: 1534 },
  { id: 13, label: t("regions.Urgench"), value: 1570.5 },
];

const tariffList1 = [
  {
    label: t("tariff_params", { n: "I", price: 295, n2: 1 }),
    price: 295,
  },
  {
    label: t("tariff_params", { n: "II", price: 147.5, n2: 1 }),
    price: 147.5,
  },
];
const tariffList2 = [
  {
    label: t("tariff_params", { n: "I", price: 450, n2: 1 }),
    price: 450,
  },
  {
    label: t("tariff_params", { n: "II", price: 450, n2: 1 }),
    price: 450,
  },
  {
    label: t("tariff_params", { n: "III", price: 450, n2: 1 }),
    price: 450,
  },
];
const IndividualType = 1;
const LegalType = 2;
const total = ref(null);
const type = ref(IndividualType);
const tariff = ref(null);
const tariffList = computed(() => {
  return type.value === IndividualType ? tariffList1 : tariffList2;
});

const formRef = ref(null);
async function calculate() {
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(5000);
  const insolationValue = region.value.value;
  total.value = round(
    trimBetween(price.value) / tariff.value?.price / insolationValue
  );
}

let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value.resetValidation();
  }, timeout);
}
function clear() {
  total.value = null;
  tariff.value = null;
}
defineExpose({
  open() {
    dialog.value = true;
  },
  close() {
    dialog.value = false;
  },
});
</script>
<template>
  <q-dialog v-model="dialog" @hide="onHide" class="power_calc_dialog">
    <q-card>
      <q-btn
        icon="clear"
        @click="dialog = false"
        round
        color="grey-4"
        flat
        dense
        class="close-btn"
      />
      <q-form ref="formRef">
        <div class="col">
          <div class="label">{{ t("select_type") }}</div>
          <div class="col--row">
            <q-radio
              v-model="type"
              :val="IndividualType"
              :label="t('Individual')"
              @update:model-value="clear"
            />
            <q-radio
              v-model="type"
              :val="LegalType"
              :label="t('Legal')"
              @update:model-value="clear"
            />
          </div>
        </div>
        <div class="col">
          <div class="label">{{ t("region") }}</div>
          <BaseSelect
            v-model="region"
            :placeholder="t('choose_an_area')"
            outlined
            :rules="[validate.required]"
            :options="regionsList"
            @update:model-value="resetValidation"
          />
        </div>
        <div class="col">
          <div class="label">{{ t("annual_payment_for_electricity") }}</div>
          <BaseInput
            v-model="price"
            type="number"
            outlined
            :rules="[validate.required, validate.positive]"
            :placeholder="t('in_soums')"
            @update:model-value="
              () => {
                resetValidation();
                total = null;
              }
            "
          />
        </div>
        <div class="col">
          <div class="label">{{ t("rate") }}</div>
          <BaseSelect
            v-model="tariff"
            :placeholder="t('choose_a_plan')"
            outlined
            :rules="[validate.required]"
            :options="tariffList"
            @update:model-value="resetValidation"
          />
        </div>
        <footer class="footer">
          <q-btn
            class="btn-login px-5"
            no-caps
            color="primary"
            :label="t('calculate')"
            @click="calculate"
          />
          <div class="total_wrap" v-show="total">
            <div class="label">{{ t("recommended_panel_power") }}</div>
            <div class="total">{{ total }} {{ t("kW") }}</div>
          </div>
        </footer>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.power_calc_dialog {
  .q-card {
    max-width: 940px;
    width: 100%;
    padding: 34px 0;
    position: relative;
    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .q-form {
    max-width: 612px;
    margin: auto;
    display: grid;
    gap: 30px;
    .col {
      .label {
        font-size: 16px;
        line-height: 18px;
        margin-bottom: 14px;
      }
      &--row {
        display: flex;
        gap: 20px;
        .q-radio {
          background-color: #f2f4f7;
          width: 100%;
          height: 60px;
          border-radius: 12px;
          padding-left: 10px;
        }
      }
    }
    .total_wrap {
      margin-top: 34px;
      .label {
        font-size: 16px;
        line-height: 18px;
        color: $text-grey;
      }
      .total {
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        margin-top: 5px;
      }
    }
  }
}
</style>
