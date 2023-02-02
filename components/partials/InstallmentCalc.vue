<script setup>
import validate from "@/utils/validate";

const { prettify, round, trimBetween, formatDate, addToDate } = useUtils();

const { t } = useI18n();

const solarStationCost = ref(null);

let total = ref(null);

const tableRow = ref([]);
const installmentPeriod = ref(1);
const formRef = ref(null);

async function calcSolarPower() {
  const hasError = !(await formRef.value.validate());
  if (hasError) return resetValidation(5000);
  tableRow.value = [];
  const cost = trimBetween(solarStationCost.value);
  total.value = round(cost / installmentPeriod.value);

  for (let i = 0; i < Array(installmentPeriod.value).length; i++) {
    tableRow.value.push({
      date: formatDate(addToDate(new Date(), { months: i }), "DD MMM YYYY"),
    });
  }
}
let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value.resetValidation();
  }, timeout);
}

const soumPerMonth = computed(() => {
  return t("num_soum", {
    n: prettify(total.value),
  });
});
const soumPerMonthV2 = computed(() => {
  return t("Num_soum_per_month", {
    n: prettify(total.value),
  });
});
</script>

<template>
  <div class="installment_wrap">
    <q-form ref="formRef">
      <div class="input-row">
        <p class="title">{{ t("Solar_station_cost") }}</p>
        <BaseInput
          v-model="solarStationCost"
          outlined
          type="number"
          :rules="[validate.required, validate.positive]"
          :placeholder="t('Cost_in_sum')"
          @update:model-value="resetValidation"
        />
      </div>
    </q-form>
    <div class="input-row">
      <p class="title">
        {{ t("Number_of_installment_months") }}
      </p>
      <div class="slider-wrap">
        <p class="month-number">
          {{ t("p_month", +installmentPeriod) }}
        </p>
        <q-slider v-model="installmentPeriod" marker :min="1" :max="36" />
      </div>
    </div>
    <div class="actions_wrap">
      <BaseBtn
        green
        no-caps
        :disable="!solarStationCost"
        :label="t('Calculate')"
        @click="calcSolarPower"
      />
    </div>
    <template v-if="total">
      <q-markup-table flat>
        <thead>
          <tr>
            <th>№</th>
            <th>{{ t("Month") }}</th>
            <th>{{ t("Summa") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in tableRow" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.date }}</td>
            <td>{{ soumPerMonth }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <footer class="footer">
        <p class="total-text">{{ t("Total") }}:</p>
        <p class="per-month">
          <b>{{ soumPerMonthV2 }}</b>
        </p>
      </footer>
    </template>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin-top: 0;
  margin-bottom: 14px;
}
.installment_wrap {
  padding: 34px 20px;
  box-shadow: 0px 4px 29px rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  .input-row {
    max-width: 700px;
    margin: auto;
    margin-bottom: 34px;
  }
  .actions_wrap {
    max-width: 700px;
    margin: auto;
    margin-top: 30px;
  }
  .slider-wrap {
    border: 1px solid #f2f2f2;
    border-radius: 12px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    position: relative;
    .month-number {
      margin-bottom: 5px;
      margin-left: 18px;
    }
    .q-slider {
      position: absolute;
      bottom: -12px;
      left: 5px;
      width: 98%;
      &:deep(.q-slider__track) {
        border-radius: 0;
        border-bottom-left-radius: 200px;
        border-bottom-right-radius: 200px;
      }
    }
  }
  .q-markup-table {
    margin-top: 48px;
    thead {
      th {
        text-transform: uppercase;
        color: $grey-8;
        text-align: left;
        border: none;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
      }
    }
    tbody {
      td {
        border: none;
      }
      tr {
        &:nth-child(odd) {
          td {
            background-color: $grey-2;
          }
        }
      }
    }
  }
  .footer {
    margin-top: 18px;
    .total-text {
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: $text-grey;
    }
    .per-month {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #272a39;
      letter-spacing: -0.02em;
    }
  }
}

.mobile {
  .installment_wrap {
    padding: 24px;
    border-radius: 14px;
    .input-row {
      margin-bottom: 24px;
      .title {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 10px;
      }
    }
    .footer {
      .total-text {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 5px;
      }
      .per-month {
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
}
</style>
