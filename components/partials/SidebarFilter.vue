<script setup>
import WidgetWrapExpansion from "./WidgetWrapExpansion.vue";
import WidgetRange from "./WidgetRange.vue";
import WidgetRadio from "./WidgetRadio.vue";
import WidgetCheckbox from "./WidgetCheckbox.vue";
import { SOLAR_PANEL_TYPE, WATER_PANEL_TYPE } from "~~/types/panel.types";

const priceType = {
  // min: 1_000_000,
  min: 0,
  max: 500_000_000,
};
const litrType = {
  min: 0,
  max: 1000,
};

const kWType = {
  min: 0,
  max: 20000,
};

const crystalType = {
  mono: "Monocrystalline",
  poly: "Polycrystalline",
};

const installationType = {
  flat: 0,
  angle: 1,
};

const productsStore = useProduct();
const route = useRoute();
const isSolarPanelPage = computed(() => +route.query.type === SOLAR_PANEL_TYPE);
const isWaterPanelPage = computed(() => +route.query.type === WATER_PANEL_TYPE);
const open = ref(false);

const { t } = useI18n();

watch(open, (v) => document.body.classList.toggle("q-body--prevent-scroll"));

const showWidgets = ref(true);

const params = ref({});
const products = useState("products");
// watchEffect(async () => {
//   if (isSolarPanelPage.value || isWaterPanelPage.value) {
//     params.value = {};
//     showWidgets.value = false;
//     await nextTick();
//     showWidgets.value = true;
//     fetchProducts();
//   }
// });
async function reset() {
  if (!Object.values(params.value)?.length) return;
  params.value = {};
  await fetchProducts();
  showWidgets.value = false;
  await nextTick();
  showWidgets.value = true;
}

async function fetchProducts() {
  const res = await productsStore.fetch(params.value);
  products.value = res.items;
}

const regiosnStore = useRegions();
const regionsList = ref(await regiosnStore.fetchRegions());

defineExpose({
  params,
  open() {
    open.value = true;
  },
  close() {
    open.value = false;
  },
});
</script>
<template>
  <aside class="sidebar_filters" :class="{ open }">
    <BaseBtn
      v-if="$q.platform.is.mobile"
      icon="clear"
      @click="open = false"
      round
      color="grey-8"
      flat
      dense
      class="close-btn"
    />
    <template v-if="showWidgets">
      <WidgetWrapExpansion label="price">
        <WidgetRange
          :min="priceType.min"
          :max="priceType.max"
          column
          :step="10000"
          @updateMin="
            (e) => {
              params.fromPrice = e;
              fetchProducts();
            }
          "
          @updateMax="
            (e) => {
              params.toPrice = e;
              fetchProducts();
            }
          "
        />
      </WidgetWrapExpansion>
      <WidgetWrapExpansion v-if="!isSolarPanelPage" label="Litr_Volume">
        <WidgetRange
          :min="litrType.min"
          :max="litrType.max"
          :column="$q.platform.is.mobile"
          @updateMin="
            (e) => {
              params.fromLiter = e;
              fetchProducts();
            }
          "
          @updateMax="
            (e) => {
              params.toLiter = e;
              fetchProducts(params);
            }
          "
        />
      </WidgetWrapExpansion>

      <WidgetWrapExpansion v-if="isSolarPanelPage" label="Crystal_type">
        <WidgetRadio
          column
          :data="[
            { label: 'Monocrystalline', val: crystalType.mono, value: false },
            { label: 'Polycrystalline', val: crystalType.poly, value: false },
          ]"
          @update="
            (e) => {
              params.crystalType = e;
              fetchProducts();
            }
          "
        />
      </WidgetWrapExpansion>
      <WidgetWrapExpansion v-else label="Instalation_type">
        <WidgetRadio
          :data="[
            {
              label: 'On_flat_surface',
              val: installationType.flat,
              value: false,
            },
            { label: 'At_angle', val: installationType.angle, value: false },
          ]"
          label="Instalation_type"
          @update="
            (e) => {
              params.installationMethod = e;
              fetchProducts();
            }
          "
        />
      </WidgetWrapExpansion>

      <WidgetWrapExpansion v-if="isSolarPanelPage" label="rated_power">
        <WidgetRange
          :min="kWType.min"
          :max="kWType.max"
          column
          @updateMin="
            (e) => {
              params.fromPower = e;
              fetchProducts();
            }
          "
          @updateMax="
            (e) => {
              params.toPower = e;
              fetchProducts();
            }
          "
        />
      </WidgetWrapExpansion>
    </template>
    <q-btn
      v-if="$q.platform.is.mobile"
      :label="t('Apply_filters')"
      color="primary"
      class="mt-auto height2 w100"
      @click="open = false"
    />
    <q-btn
      :label="t('Reset')"
      @click="
        () => {
          reset();
          open = false;
        }
      "
      :color="Object.keys(params).length === 0 ? 'grey-6' : 'primary'"
      class="height2 mt-1 w100"
    />
  </aside>
</template>

<style lang="scss" scoped>
.sidebar_filters {
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  :deep(.widget) {
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
    .content {
      padding: 10px 20px;
      padding-top: 2px;
    }
  }
}

.mobile {
  .sidebar_filters {
    overflow-y: scroll;
    position: fixed;
    left: 0;
    right: 0;
    background-color: #eee;
    top: 0;
    bottom: 0;
    z-index: 5;
    width: 100%;
    padding: 10px;
    padding-top: 45px;
    transition: 0.22s;
    transform: translateY(-100%);
    &.open {
      transform: translateY(0);
    }
    .close-btn {
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
}
</style>
