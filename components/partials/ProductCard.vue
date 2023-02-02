<script setup lang="ts">
const { prettify, round } = useUtils();
const { baseURL } = useRuntimeConfig();

const defaultSolarImg = "/images/defaultSolar.png";
const defaultWaterImg = "/images/defaultWater.png";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  defaultImg: {
    type: String,
    default: "/images/defaultSolar.png",
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  goTo: {
    type: String,
    default: "products-id",
  },
  productId: {
    type: Number,
    default: 0,
  },
});

const { t } = useI18n();

const defaultImg = computed(() => {
  return props.product?.productType === 1 ? defaultWaterImg : defaultSolarImg;
});

const image = computed(() => {
  const img = props.product?.images?.[0];
  return img ? baseURL + img : defaultImg.value;
});
</script>

<template>
  <div class="product_card">
    <div class="header">
      <div class="badge_hit" v-if="product.hit === 1">
        {{ t("Hit") }}
      </div>
      <!-- <BaseIcon
        class="text-gray-300 hover:text-orange-500"
        width="25"
        height="25"
      >
        <IconsHeartIcon />
      </BaseIcon> -->
    </div>
    <div class="image-wrap">
      <nuxt-img
        width="240px"
        height="240px"
        quality="80"
        :src="`${image}`"
        class="image"
        :alt="product.name"
        :title="product.name"
      />
      <!-- <BaseImg
        width="240px"
        height="240px"
        :src="image"
        :placeholder-img="defaultImg"
        alt="product-card-img"
        spinner-size="35px"
        class="image"
      /> -->
    </div>
    <!-- <div class="rating_row">
      <q-rating
        :model-value="product.rating || 3.5"
        size="20px"
        :max="5"
        color="grey-3"
        color-half="orange"
        color-selected="orange"
        icon-half="star_half"
        class="no-shadow"
        icon-aria-label="raiting"
        no-dimming
      />
      <div class="num">{{ product.rating || 3.5 }}</div>
    </div> -->
    <div class="name mt-4">{{ product?.name }}</div>
    <div class="category text-blue-600">
      <BaseLink :to="localePath('/')" :label="product?.category?.name || ''" />
    </div>
    <div class="price">
      {{ t("num_soum", { n: prettify(product?.price) }) }}
    </div>
    <div class="text_row">
      <div class="title">{{ t("Price_including_compensation") }}</div>
      <div class="value">
        {{
          t("num_soum", { n: prettify(product?.priceWithCompensation || 0) })
        }}
      </div>
    </div>
    <div class="text_row">
      <div class="title">{{ t("Installment_price") }}</div>
      <div class="value">
        <template v-if="product.compensationOnly">
          {{ t("Unavailable") }}
        </template>
        <template v-else>
          {{ t("num_soum", { n: prettify(round(product.price / 36)) }) }}
          <span class="badge"> x {{ 36 }} {{ t("month_short") }} </span>
        </template>
      </div>
    </div>
    <BaseBtn
      v-if="showBtn"
      color="grey-3"
      class="text-black"
      :label="t('More_detailed')"
      unelevated
      :to="localePath(`/products/${product.id}`)"
    />
  </div>
</template>

<style lang="scss" scoped>
.product_card {
  background-color: #fff;
  width: 100%;
  border-radius: 24px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid $border-color;
  position: relative;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    .badge_hit {
      width: 53px;
      height: 26px;
      background: linear-gradient(89.9deg, #eeff29 -68.89%, #ff3333 171%);
      border-radius: 24px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
  }
  .image-wrap {
    display: flex;
    justify-content: center;
    .image {
      max-width: 240px;
      width: 100%;
      height: 240px;
    }
  }
  .rating_row {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 15px;
    .num {
      margin-left: 15px;
      font-weight: 500;
      font-size: 13px;
      line-height: 17px;
    }
    :deep() {
      .q-rating__icon--exselected {
        color: $grey-3 !important;
      }
    }
  }
  .name {
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    overflow: hidden;
    height: max-content;
    -ms-line-clamp: 2;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: initial;
    margin-bottom: 8px;
  }
  .category {
    margin-top: auto;
  }
  .price {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    color: $grey;
    margin-top: 12px;
    text-decoration: line-through;
  }
  .text_row {
    margin-top: 14px;
    .title {
      color: $text-grey;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
    .value {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      .badge {
        background-color: $warning;
        padding: 5px 7px;
        background: #ffde68;
        border-radius: 58px;
        font-size: 14px;
        line-height: 16px;
        margin-left: 8px;
        font-weight: 500;
      }
    }
  }
  .q-btn {
    height: 50px;
    margin-top: 34px;
  }
}
.mobile {
  .product_card {
    .text_row {
      .value {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
}
</style>
