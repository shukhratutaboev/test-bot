<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { IOrgSeller } from "~~/types/organization.types";
import { IProduct } from "~~/types/product.types";

const { t, locale } = useI18n();
const router = useRouter();
const organizationStore = useOrganization();
const productStore = useProduct();
const { prettify, round, useQuasar } = useUtils();
const $q = useQuasar();

const infoAboutSeller = ref<IOrgSeller | null>(null);

onMounted(loadData);

const orgName = ref<string | null>(null);

const products = ref<IProduct[]>([]);

async function loadData() {
  await loadProductById();
  const res = await productStore.fetch({
    size: 20,
  });
  if (!Array.isArray(res)) return;

  products.value = res;
  await loadInfoAboutSeller();
  if (!infoAboutSeller.value) {
    const res = await organizationStore.fetch();
    if (res.error) return;

    orgName.value =
      res.items?.find((f) => f.id === product.value.organizationId)
        ?.organizationName || null;
  }
}

const route = useRoute();
const product = ref<IProduct>({});
const productId = computed(() => +route.params.id);
async function loadProductById() {
  $q.loading.show();
  const res = await productStore.getById(productId.value);
  if (res.error) {
    router.push("/");
    $q.notify({
      progress: true,
      position: "top",
      message: t("This_product_does_not_exist"),
      type: "warning",
      timeout: 4000,
    });
  }
  $q.loading.hide();
  if (!res.item?.id) return;
  product.value = res.item;
}
async function loadInfoAboutSeller() {
  const res = await organizationStore.getInfoAboutSeller(
    product.value.organizationId || 0
  );
  if (res?.error) return;
  infoAboutSeller.value = res?.item || null;
}

watch(route, () => {
  if (route.params.id) loadData();
});
watch(locale, loadData);

const productTab = ref("about_seller");

const monthList = ref([
  {
    month: 12,
    active: true,
  },
  {
    month: 24,
    active: false,
  },
  {
    month: 36,
    active: false,
  },
]);

const activeMonth = computed(
  () => monthList.value.find((f) => f.active)?.month || 0
);
function onHandleMonthItemClick(v: any) {
  monthList.value.forEach((f) => (f.active = false));
  v.active = true;
}
</script>

<template>
  <div class="product_page">
    <div class="container">
      <header class="header">
        <!-- <div class="breadcrumbs">
          Главная > Каталог > Солнечные электростанции > на 2 кВт > Комплект
          однофазный, 2 кВт, Solax – Jinko Solar
        </div> -->
        <div class="product_name">
          {{ product.name }}
        </div>
      </header>
      <div class="product_wrap">
        <div class="product_info_card">
          <PartialsProductPhotoSlider :product="product" />
          <div class="specifications">
            <template v-if="product.productType === 0">
              <div class="row">
                <div class="name">{{ t("Crystal_type") }}</div>
                <div class="value">{{ t(product.crystalType || "") }}</div>
              </div>
              <div class="row">
                <div class="name">{{ t("Power") }}</div>
                <div class="value">
                  {{ t(round((product.power || 0) / 1000) || "") }}
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row">
                <div class="name">{{ t("Installation_method") }}</div>
                <div class="value">
                  {{ t(product.installationMethod || "") }}
                </div>
              </div>
              <div class="row">
                <div class="name">{{ t("Litr_Volume") }}</div>
                <div class="value">
                  {{ t(round(product.liter || 0) || "") }}
                </div>
              </div>
            </template>
            <div
              class="row"
              v-for="(item, index) in Object.entries(product.properties || {})"
              :key="index"
            >
              <div class="name">{{ t(item[0] || "") }}</div>
              <div class="value">
                {{ t(item[1] || "") }}
              </div>
            </div>
          </div>
        </div>
        <div class="installment_info_card">
          <div class="title">{{ t("Price_including_compensation") }}</div>
          <div class="old_price">
            {{ prettify(round(product.price || 0)) }}
            <span class="sum">{{ t("sum") }}</span>
          </div>
          <div class="price product_price discount">
            {{ prettify(round(product.priceWithCompensation || 0)) }}
            <span class="sum">{{ t("sum") }}</span>
            <!-- <span class="badge">-15%</span> -->
          </div>
          <template v-if="!product?.compensationOnly">
            <div class="title">{{ t("Buy_in_installments") }}</div>
            <div class="month_list_wrap">
              <div
                v-for="item in monthList"
                :class="{ active: item.active }"
                class="item"
                @click="onHandleMonthItemClick(item)"
              >
                <span>{{ item.month }}</span>
                <span>{{ t("month_short") }}</span>
              </div>
            </div>
            <div class="price">
              {{ prettify(round((product.price || 0) / activeMonth)) }}
              <span class="sum">{{ t("sum_month_short") }}</span>
            </div>
          </template>
          <BaseBtn
            green
            :label="t('submit_your_application')"
            :to="localePath(`/order/${product.id}`)"
            style="padding: 14px 0"
            class="full-width"
          />
        </div>
        <div class="footer">
          <ClientOnly>
            <q-tabs
              v-model="productTab"
              indicator-color="transparent"
              no-caps
              align="left"
            >
              <q-tab name="about_seller" :label="t('About_seller')" />
              <q-tab name="description" :label="t('Description')" />
            </q-tabs>
          </ClientOnly>
          <div class="tabs_content">
            <div v-if="productTab === 'about_seller'" class="content">
              <div v-if="infoAboutSeller" class="about_seller">
                <div class="org_name" v-if="infoAboutSeller?.organizationName">
                  {{ infoAboutSeller.organizationName }}
                </div>
                <div class="org_desc mb-2" v-if="infoAboutSeller.description">
                  {{ infoAboutSeller.description }}
                </div>
                <div class="org_phone mb-1" v-if="infoAboutSeller.phone">
                  <q-icon name="phone" color="grey-6" />
                  {{ infoAboutSeller.phone }}
                </div>
                <div
                  class="org_region mb-1"
                  v-if="infoAboutSeller.region?.name"
                >
                  <q-icon name="location_on" color="grey-6" />
                  {{ infoAboutSeller.region.name }},
                  {{ infoAboutSeller.address }}
                </div>
                <div class="org_email mb-1" v-if="infoAboutSeller.email">
                  <q-icon name="email" color="grey-6" />
                  {{ infoAboutSeller.email }}
                </div>
              </div>
              <div v-else>
                {{ orgName }}
              </div>
            </div>
            <div v-if="productTab === 'description'" class="content">
              {{ product.description }}
            </div>
          </div>
        </div>
      </div>
      <section class="section_products">
        <div class="title">{{ t("Suitable_products") }}</div>
        <div class="products products_grid">
          <PartialsProductCard
            v-for="(item, idx) in products"
            :key="idx"
            :product="item"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product_page {
  padding-bottom: 60px;
  .header {
    padding-top: 25px;
    margin-bottom: 20px;
    .product_name {
      font-weight: 700;
      font-size: 36px;
      line-height: 38px;
      margin-bottom: 22px;
    }
  }
  .product_wrap {
    margin-bottom: 48px;
    display: flex;
    flex-wrap: wrap;
    .product_info_card {
      background-color: #fff;
      padding: 24px;
      border-radius: 4px;
      padding-right: 20px;
      display: flex;
      align-items: flex-start;
      .product_photo_slider {
        padding-right: 20px;
        position: sticky;
        top: 10px;
        width: 100%;
        max-width: 430px;
      }
      .specifications {
        max-width: 550px;
        max-height: 400px;
        overflow-y: scroll;
        .row {
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: nowrap;
          justify-content: space-between;
          .name {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            font-size: 14px;
            line-height: 16px;
            color: $text-grey;
            white-space: nowrap;
            width: 100%;
            display: flex;
            align-items: flex-end;
            &:after {
              content: "";
              border-bottom: 2px dotted $border-color;
              width: 100%;
              height: 1px;
              margin-left: 5px;
              margin-bottom: 5px;
            }
          }
          .value {
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            padding-left: 10px;
            width: 250px;
            min-width: 250px;
            // margin-left: auto;
          }
        }
      }
    }
    .installment_info_card {
      margin-left: auto;
      padding: 24px;
      background-color: #fff;
      width: 348px;
      height: 403px;
      box-shadow: 0px -1px 21px rgba(0, 0, 0, 0.08);
      border-radius: 24px;
      .title {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        color: $text-grey;
        margin-bottom: 14px;
      }
      .old_price {
        text-decoration: line-through;
        color: $text-grey;
        line-height: 16px;
      }
      .price {
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        &.discount {
          display: flex;
          align-items: center;
          .badge {
            padding: 4px 6px;
            background-color: $red-4;
            color: #fff;
            border-radius: 6px;
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            margin-left: 10px;
          }
        }
        &.product_price {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid $border-color;
        }
        .sum {
          color: $text-grey;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          margin-left: 5px;
        }
      }
      .month_list_wrap {
        display: flex;
        width: 100%;
        margin-bottom: 18px;
        .item {
          width: 100%;
          font-weight: 500;
          font-size: 14px;
          line-height: 99.02%;
          border: 1px solid $border-color;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:nth-child(1) {
            border-radius: 12px 0 0 12px;
          }
          &:nth-child(2) {
            border-left: none;
            border-right: none;
          }
          &:nth-child(3) {
            border-radius: 0px 12px 12px 0px;
          }
          &.active {
            background: #26282f;
            color: #fff;
            border-color: #26282f;
          }
          &:hover:not(.active) {
            background-color: $grey-2;
          }
        }
      }
      .q-btn {
        margin-top: 28px;
      }
    }
    .footer {
      flex-grow: 1;
      background-color: #fff;
      padding: 24px;
      border-radius: 4px;
      .q-tabs {
        margin-left: -15px;
        :deep(.q-tabs__content) {
          .q-tab {
            .q-tab__label {
              color: $text-grey;
              font-weight: 700;
              font-size: 20px;
              line-height: 23px;
            }
            &--active {
              .q-tab__label {
                color: $dark;
              }
            }
          }
        }
      }
      .tabs_content {
        margin-top: 20px;

        .about_seller {
          .org_name {
            font-weight: 700;
            font-size: 20px;
            line-height: 23px;
            letter-spacing: -0.02em;
            margin-bottom: 14px;
          }
          .q-icon {
            margin-right: 15px;
            font-size: 20px;
          }
        }
      }
    }
  }
  .section_products {
    .title {
      font-weight: 600;
      font-size: 24px;
      line-height: 29px;
      margin-bottom: 20px;
    }
    .products {
    }
  }
}

.mobile {
  @media (max-width: 1140px) {
    .product_page {
      padding-bottom: 60px;
      .product_wrap {
        display: block;
        margin-bottom: 30px;
        .product_card {
          margin-bottom: 20px;
          grid-column: 1;
          padding: 24px;
          .product_name {
            font-size: 22px;
            line-height: 25px;
            margin-bottom: 22px;
          }
          .product_grid {
            display: block;
            .image {
              padding: 0;
              padding-bottom: 20px;
            }
          }
        }
        .footer {
          padding: 0;
          .q-tabs {
            margin-left: 0;
            .content {
              padding: 20px;
            }
          }
          .tabs_content {
            margin-top: 0;
            padding: 20px;
          }
        }
      }
      .section_products {
        .title {
          font-weight: 600;
          font-size: 20px;
          line-height: 23px;
        }
        .products {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          flex-wrap: wrap;
          .product_card {
            width: calc(50% - 10px);
          }
        }
      }
      @media (max-width: 640px) {
        .product_wrap {
          margin-bottom: 20px;
          .product_card {
            margin-bottom: 20px;
            grid-column: 1;
            padding: 15px;
            .product_name {
              font-size: 20px;
              line-height: 27px;
              margin-bottom: 10px;
            }
            .product_grid {
              .image {
                padding: 0;
                padding-bottom: 10px;
              }
              .specifications {
                .row {
                  .name {
                    width: 250px;
                  }
                }
              }
            }
          }
        }
        .section_products {
          .title {
            font-weight: 600;
            font-size: 18px;
            line-height: 20px;
          }
          .products {
            gap: 15px;
            .product_card {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
