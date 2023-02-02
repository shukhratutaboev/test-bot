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
  <nuxt-link class="product_card" :to="localePath(`/products/${product.id}`)">
    <div class="header">
      <div class="badge_hit" v-if="product.hit === 1">
        {{ t("Hit") }}
      </div>
      <BaseIcon
        class="text-gray-300 hover:text-orange-500"
        width="25"
        height="25"
      >
        <IconsHeartIcon />
      </BaseIcon>
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
    </div>
    <div class="content_wrap">
      <div class="score_wrap">
        <q-icon name="star" color="orange" size="16px" />
        <div class="num">{{ product.rating || 3.5 }}</div>
        <div class="num">(40 оценок)</div>
      </div>
      <div class="name">{{ product?.name }}</div>
      <div class="infow_wrap mt-auto">
        <div class="value">
          <span class="badge">
            <template v-if="product.compensationOnly">
              {{ t("Unavailable") }}
            </template>
            <template v-else>
              {{ t("num_soum", { n: prettify(round(product.price / 36)) }) }}/{{
                36
              }}
              {{ t("month_short") }}
            </template>
          </span>
        </div>
      </div>
      <div class="infow_wrap">
        <div class="old_price">
          {{ t("num_soum", { n: prettify(product?.price) }) }}
        </div>
        <div class="new_price">
          {{
            t("num_soum", { n: prettify(product?.priceWithCompensation || 0) })
          }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.product_card {
  background-color: #fff;
  width: 100%;
  border-radius: 12px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgb(231, 229, 229);
  .header {
    padding: 16px;
    border-radius: 8px;
    position: relative;
    .base_icon {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 2;
    }
    .badge_hit {
      position: absolute;
      z-index: 2;
      left: 16px;
      top: 16px;
      width: 53px;
      height: 26px;
      background: linear-gradient(89.9deg, #eeff29 -68.89%, #ff3333 171%);
      border-radius: 6px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
    }
    .image-wrap {
      display: flex;
      justify-content: center;
      border-radius: 8px;
      position: relative;
      z-index: 1;
      .image {
        max-width: 240px;
        width: 100%;
        height: 240px;
        transition: 0.2s ease;
      }
    }
  }
  &:hover {
    .image {
      scale: 1.03;
    }
  }
  .content_wrap {
    padding: 16px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .score_wrap {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      color: $text-grey;
      font-size: 13px;
      .num {
        margin-left: 3px;
        line-height: 15px;
      }
      :deep() {
        .q-rating__icon--exselected {
          color: $grey-3 !important;
        }
      }
    }
    .name {
      font-size: 13px;
      line-height: 15.36px;
      overflow: hidden;
      // height: 35px;
      // height: max-content;
      -ms-line-clamp: 2;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: initial;
      margin-bottom: 6px;
    }
  }
  .badge {
    background-color: $warning;
    padding: 3px 5px;
    background: #ffde68;
    border-radius: 4px;
    font-size: 12.5px;
    line-height: 16px;
    font-weight: 400;
  }
  .old_price {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: $grey;
    text-decoration: line-through;
  }
  .new_price {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
  }
  .infow_wrap {
    margin-bottom: 5px;
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
