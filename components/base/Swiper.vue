<script setup>
import { Navigation, Pagination, A11y, Virtual } from "swiper";
import { Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});
const swiper = ref(null);

const defaultOption = {
  spaceBetween: 20,
  slidesPerView: 3,
  clickable: true,
  isCustomNav: false,
  navigation: true,
};
const sliderOption = { ...defaultOption, ...props.options };

const onSwiper = (sw) => {
  swiper.value = sw;
};

const modules = [Virtual, Navigation, Pagination, A11y];
</script>

<template>
  <ClientOnly>
    <Swiper
      :modules="modules"
      :slides-per-view="sliderOption.slidesPerView"
      :space-between="sliderOption.spaceBetween"
      :breakpoints="sliderOption.breakpoints"
      :virtual="true"
      :navigation="sliderOption.navigation"
      :pagination="sliderOption.pagination"
      class="swiper"
      @swiper="onSwiper"
    >
      <slot />
    </Swiper>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.swiper {
  padding-bottom: 45px;
  margin-bottom: -45px;
  :deep(.swiper-pagination) {
  }
}
</style>
