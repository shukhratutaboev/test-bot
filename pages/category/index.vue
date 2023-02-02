<script setup>
import { SOLAR_PANEL_TYPE } from "~~/types/panel.types";

const { useQuasar, scrollTo } = useUtils();
const productsStore = useProduct();

const { t } = useI18n();
const route = useRoute();
const productType = computed(() => route.query.type);
const isSolarPanelPage = computed(() => +route.query.type === SOLAR_PANEL_TYPE);

const powerCalcDialogRef = ref(null);
const rowsPerPage = ref(9);
const $q = useQuasar();
onWindowResize();
function onWindowResize(v) {
  if (window.innerWidth <= 1140 && window.innerWidth > 600)
    rowsPerPage.value = 6;
  else if (window.innerWidth <= 600) rowsPerPage.value = 4;
}
window.addEventListener("resize", onWindowResize);

onBeforeUnmount(() => window.removeEventListener("resize", onWindowResize));

const defaultParams = computed(() => {
  return {
    size: rowsPerPage.value,
    productType: productType.value,
  };
});

onMounted(() => fetchProducts(defaultParams.value));
watch(defaultParams, () => fetchProducts(defaultParams.value));

const sidebarFilterRef = ref(null);
const currentPage = ref(1);

async function onHandleChangePagination(page) {
  const params = {
    ...sidebarFilterRef.value?.params,
    ...defaultParams.value,
    page,
  };
  scrollTo(0);
  await fetchProducts(params);
}

const products = useState("products", () => []);
const productsTotalCount = useState("productsTotalCount");

const loading = ref(true);
async function fetchProducts(params) {
  loading.value = true;
  const res = await productsStore.fetch(params);
  loading.value = false;
  products.value = res.items;
  return products.value;
}

const paginationMaxCount = computed(() =>
  Math.ceil(productsStore.allCount / rowsPerPage.value)
);

const productOptionsList = [
  {
    label: t("Popular"),
    value: 1,
  },
];
const productOption = ref(productOptionsList[0]);
</script>

<template>
  <div class="category_page">
    <div class="container">
      <header class="header">
        <div class="title">
          {{ t(isSolarPanelPage ? "solar_power_plants" : "water_heaters") }}
          <span class="badge">{{
            t("products_count", productsTotalCount)
          }}</span>
        </div>
      </header>
      <section class="section-wrap">
        <PartialsSidebarFilter ref="sidebarFilterRef" />
        <div class="content">
          <div class="filters">
            <!-- <BaseSelect
              v-model="productOption"
              :options="productOptionsList"
              outlined
              dense
              class="pr-8"
              style="width: 300px"
            /> -->
            <BaseBtn
              v-if="$q.platform.is.desktop"
              :label="t('Power_calculation')"
              color="grey-3"
              class="text-dark ml-auto"
              style="padding: 8px 50px"
              @click="() => powerCalcDialogRef.open()"
            />
            <BaseBtn
              v-if="$q.platform.is.mobile"
              :label="t('Filters')"
              flat
              class="ml-auto"
              icon-right="tune"
              @click="() => sidebarFilterRef.open()"
            />
          </div>
          <main class="products products_grid">
            <PartialsSkeletonProductCard v-if="loading" />
            <PartialsProductCard
              v-else
              v-for="(item, idx) in products"
              :key="idx"
              :product="item"
            />
          </main>
          <div class="pt-6 flex flex-center" v-if="paginationMaxCount > 1">
            <q-pagination
              v-model="currentPage"
              :max="paginationMaxCount"
              :max-pages="6"
              boundary-numbers
              boundary-links
              direction-links
              @update:model-value="onHandleChangePagination"
            />
          </div>
        </div>
      </section>
    </div>
    <PartialsPowerCalcDialog ref="powerCalcDialogRef" />
  </div>
</template>

<style lang="scss" scoped>
.category_page {
  padding-bottom: 60px;
  .header {
    padding-top: 24px;
    padding-bottom: 37px;
    .title {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 36px;
      line-height: 41px;
      letter-spacing: -0.04em;
      .badge {
        font-size: 16px;
        line-height: 18px;
        color: $text-grey;
        margin-left: 8px;
        margin-top: 10px;
        margin-top: 0;
      }
    }
  }
  .section-wrap {
    display: flex;
    // gap: 20px;
    .sidebar-filters {
      width: 340px;
    }
    .content {
      width: 100%;
      .filters {
        display: flex;
        padding-bottom: 20px;
      }

      .products {
        position: relative;
      }
    }
  }
}
.mobile {
  .category_page {
    .header {
      padding-top: 14px;
      padding-bottom: 20px;
      .title {
        font-size: 17px;
        line-height: 20px;
        .badge {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
