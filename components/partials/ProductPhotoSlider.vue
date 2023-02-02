<script setup lang="ts">
import { IProduct } from "~~/types/product.types";

interface IProps {
  product?: IProduct;
}
const props = defineProps<IProps>();

const { baseURL } = useRuntimeConfig();

const defaultSolarImg = "/images/defaultSolar.png";
const defaultWaterImg = "/images/defaultWater.png";
const defaultImg = computed(() => {
  return props.product?.productType === 1 ? defaultWaterImg : defaultSolarImg;
});
const image = computed(() => {
  const img = props.product?.images?.[0];
  return img ? baseURL + img : defaultImg.value;
});
</script>
<template>
  <div class="product_photo_slider">
    <nuxt-img
      width="100%"
      height="100%"
      quality="80"
      :src="image"
      :alt="product?.name"
      class="image"
    />
    <!-- <q-img
      width="100%"
      :src="image"
      :placeholder-src="defaultSolarImg"
      alt="product-card-img"
      class="image"
    >
      <template v-slot:error>
        <img :src="defaultImg" alt="error-img" />
      </template>
    </q-img> -->

    <BaseSwiper :options="sliderSettings">
      <SwiperSlide
        v-for="(item, idx) in partners"
        :key="idx"
        :virtualIndex="idx"
        class="swiper-slide"
      >
        <NuxtImg
          width="54"
          height="54"
          quality="80"
          class="mr-4"
          :src="`/images/partners/${item.img}.png`"
          :alt="item.name"
        />
      </SwiperSlide>
    </BaseSwiper>
  </div>
</template>
