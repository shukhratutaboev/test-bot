<script setup>
import validate from "@/utils/validate";
const { t } = useI18n();
const { prettify, trimBetween } = useUtils();

const BCA = 300_000;
let rate = ref("");
let powerValue = ref("");
let total = ref("");
let panelType = ref("solar");

function onClear() {
  powerValue.value = "";
  total.value = "";
}
const formRef = ref(null);

async function calcSolarPower() {
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(5000);
  const value = trimBetween(powerValue.value);
  if (!value) return;

  let exp = 0;
  if (panelType.value === "solar") {
    if (value < 0.5) exp = 0;
    else if (value >= 0.5 && value < 1) exp = 7;
    else if (value >= 1 && value < 1.5) exp = 10;
    else if (value >= 1.5 && value < 2) exp = 15;
    else if (value >= 2 && value < 5) exp = 20;
    else exp = 50;
  } else if (panelType.value === "water") {
    if (value >= 1 && value <= 100) exp = 5;
    else if (value > 100) exp = 7;
  }

  rate.value = exp;
  total.value = BCA * rate.value;
}
let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value?.resetValidation();
  }, timeout);
}

const totalFormated = computed(() => {
  return t("BCA_with_number", {
    n: rate.value,
    res: prettify(total.value),
  });
});
const showSolarWarningText = computed(() => {
  return panelType.value === "solar" && powerValue.value >= 5 && total.value;
});

function togglePanelType(type) {
  panelType.value = type;
  onClear();
}
</script>

<template>
  <div class="subsidy_wrap">
    <div class="header">
      <p class="title">{{ t("Select_the_type") }}</p>
      <div class="toggle-row">
        <div
          :class="{ active: panelType === 'solar' }"
          class="card"
          @click="togglePanelType('solar')"
        >
          <span class="text">{{ t("Solar_panel") }}</span>
        </div>
        <div
          class="card"
          :class="{ active: panelType === 'water' }"
          @click="togglePanelType('water')"
        >
          <span class="text">{{ t("Solar_water_heater") }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <p class="title">{{ t("Specify_the_power_of_the_solar_panel_in_kW") }}</p>
      <q-form ref="formRef">
        <div class="input-btn-row">
          <BaseInput
            v-model="powerValue"
            class="w-full"
            :placeholder="
              panelType === 'solar' ? t('Power_in_kW') : t('Volume_in_liters')
            "
            outlined
            type="number"
            :rules="[validate.required, validate.positive]"
            @update:model-value="
              () => {
                resetValidation();
                total = '';
              }
            "
          />
          <BaseBtn
            green
            class="q-px-lg"
            :disable="!powerValue"
            :label="t('Calculate')"
            @click="calcSolarPower"
          />
        </div>
      </q-form>
      <div class="total_wrap" v-if="total">
        <p class="label">{{ t("Total") }}:</p>
        <p class="value mb-0">
          <span class="text-grey-7">{{ t("Amount_compensation") }}</span>
          <span class="text-green ml-2">{{ totalFormated }}</span>
        </p>
      </div>
      <p v-if="showSolarWarningText" class="text-warning mt-2 mb-0 px-2">
        {{ t("Compensation_is_provided") }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subsidy_wrap {
  padding: 34px 25px;
  box-shadow: 0px 4px 29px rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  .header {
    max-width: 700px;
    margin: auto;
    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14px;
      margin-bottom: 34px;
      gap: 15px;
      .card {
        width: 50%;
        padding: 20px;
        background: #f2f4f7;
        border-radius: 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:before {
          content: "";
          width: 20px;
          height: 20px;
          background-color: #ffffff;
          border: 1.5px solid #e0e0e0;
          border-radius: 50%;
          margin-right: 14px;
        }
        &.active {
          &:before {
            border: 4px solid #1084fa;
          }
        }
      }
    }
  }
  .content {
    max-width: 700px;
    margin: auto;
    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
    .input-btn-row {
      display: flex;
      justify-content: space-between;
      margin: 14px 0 35px 0;
      gap: 15px;
    }
    .total_wrap {
      background: $border-color;
      border-radius: 12px;
      padding: 14px 24px;
      .label {
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: $text-grey;
        margin-bottom: 8px;
      }
      .value {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
      }
    }
    .fifty-warning {
      margin-top: 10px;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: $text-grey;
    }
  }
}
.mobile {
  .subsidy_wrap {
    padding: 24px;
    border-radius: 14px;
    .header {
      .title {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 10px;
      }
      .toggle-row {
        margin-top: 10px;
        margin-bottom: 24px;
        gap: 14px;
        .card {
          width: 50%;
          padding: 14px 20px;
          background: #f2f4f7;
          border-radius: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }
    }
    .content {
      .title {
        line-height: 18px;
        margin-bottom: 10px;
      }
      .input-btn-row {
        margin-top: 10px;
        margin-bottom: 24px;
      }
      .fifty-warning {
        font-size: 14px;
        line-height: 18px;
      }
    }
    .q-btn {
      height: 47px;
    }

    @media (max-width: 600px) {
      .header {
        .title {
          font-size: 14px;
          line-height: 18px;
          margin-bottom: 10px;
        }
        .toggle-row {
          margin-top: 10px;
          margin-bottom: 24px;
          display: grid;
          grid-template-columns: 1fr;
          .card {
            width: 100%;
          }
        }
      }
      .content {
        .input-btn-row {
          display: grid;
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>
