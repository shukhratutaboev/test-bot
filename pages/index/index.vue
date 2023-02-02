<script setup lang="ts">
import { IProduct } from "~~/types/product.types";
import CatalogCard from "./modules/CatalogCard";
import { catalogList } from "./modules/data/catalog.data";
import SwiperOurPartners from "./modules/SwiperOurPartners.vue";
import TopBannerLeft from "./modules/TopBannerLeft.vue";
import TopBannerRight from "./modules/TopBannerRight.vue";

const { t } = useI18n();

const productStore = useProduct();
const tab = ref("subsidy");

onMounted(async () => {
  await fetchProductsHist();
  await fetchProductsTab();
});

const productsHitsList = ref<IProduct[]>([]);
async function fetchProductsHist() {
  const res = await productStore.fetch({ size: 5, hit: 1 });
  productsHitsList.value = res.items || [];
}

const PRODUCT_TAB_1 = 1;
const PRODUCT_TAB_2 = 2;
const PRODUCT_TAB_3 = 3;

const sectionChooseFilters = [
  {
    label: "Снизить затраты на электроэнергию",
    params: {
      tab: PRODUCT_TAB_1,
    },
  },
  {
    label: "Находитесь далеко от энергосети",
    params: {
      tab: PRODUCT_TAB_2,
    },
  },
  {
    label: "Частые перебои с энергоснабжением",
    params: {
      tab: PRODUCT_TAB_3,
    },
  },
];
const productsTabList = ref<IProduct[]>([]);
const activeProductTab = ref(PRODUCT_TAB_1);
async function fetchProductsTab(tab = PRODUCT_TAB_1) {
  const res = await productStore.fetch({ size: 5, tab });
  productsTabList.value = res.items || [];
  activeProductTab.value = tab;
}
</script>
<template>
  <main class="home_page">
    <section class="section_top_banner">
      <div class="container">
        <div class="banner_big">
          <TopBannerLeft />
        </div>
        <div class="banner_small">
          <TopBannerRight />
        </div>
      </div>
    </section>
    <section class="section_catalog">
      <div class="container">
        <div class="title">{{ t("Catalog") }}</div>
        <div class="subtitle">
          {{ t("There_are_n_categories_to_choose_from", { n: 2 }) }}
        </div>
        <div class="catalog_cards">
          <CatalogCard :item="item" v-for="item in catalogList" />
        </div>
        <!-- <div class="text-center mt-12">
          <BaseBtn
            green
            :label="t('View_the_entire_catalog')"
            :to="localePath('/about-us')"
            style="padding: 20px 34px"
          />
        </div> -->
      </div>
    </section>
    <section class="section_sales_hits">
      <div class="container">
        <div class="header">
          <div class="title">{{ t("Sales_hits") }}</div>
          <BaseLink
            class="text-primary ml-auto"
            :label="t('View_all_products')"
            :to="localePath('/hit')"
            q-icon-right="chevron_right"
            q-icon-color="text-primary"
          />
        </div>
        <div class="products products_grid">
          <PartialsProductCard
            v-for="(item, idx) in productsHitsList"
            :product="item"
          />
        </div>
      </div>
    </section>
    <div class="section_calculation" id="calculate">
      <div class="container">
        <div class="header">
          <div class="title">{{ t("Calculate_the_cost") }}</div>
          <div class="subtitle">{{ t("section_calculation.subtitle") }}</div>
        </div>

        <div class="header_tab">
          <div
            class="tab"
            :class="{ active: tab === 'subsidy' }"
            @click="tab = 'subsidy'"
          >
            {{ t("Calculation_of_compensation") }}
          </div>
          <div
            class="tab"
            :class="{ active: tab === 'installment' }"
            @click="tab = 'installment'"
          >
            {{ t("Payment_in_installments") }}
          </div>
        </div>
        <PartialsSubsidyCalc v-if="tab === 'subsidy'" />
        <PartialsInstallmentCalc v-else-if="tab === 'installment'" />
      </div>
    </div>
    <section class="section_partners">
      <div class="container">
        <div class="header">
          <div class="title">{{ t("Our_partners") }}</div>
          <!-- <BaseLink
            class="text-primary ml-auto"
            :to="localePath('/')"
            :label="t('View_all_partners')"
            q-icon-right="chevron_right"
            q-icon-color="text-primary"
          /> -->
        </div>
        <SwiperOurPartners />
      </div>
    </section>

    <section class="section_choose_solar_power">
      <div class="container">
        <div class="header">
          <div class="title">
            {{ t("Choose_a_solar_power_plant_for_your_tasks") }}
          </div>
          <!-- <BaseLink
            class="text-primary ml-auto"
            :label="t('View_all_products')"
            :to="localePath('/')"
            q-icon-right="chevron_right"
            q-icon-color="text-primary"
          /> -->
        </div>
        <div class="filters_wrap">
          <div
            v-for="(item, idx) in sectionChooseFilters"
            @click="fetchProductsTab(item.params.tab)"
            class="filter"
            :class="{ active: item.params.tab === activeProductTab }"
          >
            {{ t(item.label) }}
          </div>
        </div>
        <div class="products products_grid">
          <PartialsProductCard
            v-for="(item, idx) in productsTabList"
            :product="item"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home_page {
  padding-top: 36px;
  .section_top_banner {
    .container {
      // display: grid;
      // grid-template-columns: 3fr 1fr;
      // gap: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .banner_big {
      width: calc(100% - 360px);
      height: 312px;
    }
    .banner_small {
      height: 312px;
      width: 340px;
    }
  }
  .section_catalog {
    padding-top: 96px;
    .title {
      font-weight: 700;
      font-size: 40px;
      line-height: 51px;
      text-align: center;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: $grey-5;
      margin-top: 12px;
    }
    .catalog_cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 52px;
    }
  }
  .section_sales_hits {
    padding-top: 90px;
    .header {
      @apply flex;
      margin-bottom: 34px;
      .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
      }
    }

    .products {
    }
  }
  .section_calculation {
    padding-top: 96px;
    .header {
      .title {
        font-weight: 700;
        font-size: 40px;
        line-height: 51px;
        text-align: center;
        letter-spacing: -0.02em;
      }
      .subtitle {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: $text-grey;
        max-width: 588px;
        margin: auto;
        margin-top: 12px;
      }
    }
    .header_tab {
      display: flex;
      width: max-content;
      border: 1px solid $border-color;
      border-radius: 8px;
      margin: auto;
      margin-top: 24px;
      margin-bottom: 34px;
      .tab {
        margin: 4px;
        padding: 8px 18px;
        width: 50%;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        color: $text-grey;
        white-space: nowrap;
        &.active {
          background-color: $border-color;
          color: $dark;
        }
        &:hover {
          background-color: darken($border-color, 2);
        }
        &:first-child {
          margin-right: 0;
        }
      }
    }
    .container {
      max-width: 940px;
    }
  }
  .section_partners {
    margin-top: 96px;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 34px;
      .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
      }
    }
  }
  .section_choose_solar_power {
    padding: 96px 0;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 34px;
      .title {
        font-weight: 700;
        font-size: 24px;
        line-height: 31px;
      }
    }
    .filters_wrap {
      display: flex;
      gap: 34px;
      margin-bottom: 40px;
      .filter {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: $text-grey;
        cursor: pointer;
        padding-bottom: 4px;
        &.active {
          color: $primary;
          border-bottom: 2px solid $primary;
        }
      }
    }
  }
}
</style>
