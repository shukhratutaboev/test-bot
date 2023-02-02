<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";
const { t } = useI18n();
const { useQuasar } = useUtils();
const $q = useQuasar();

const sliderSettings = {
  slidesPerView: 1,

  navigation: false,
};
const sliderList = [
  {
    image: "banner-lg.png",
    title: "home_slider_texts.slide1_title",
    desc: "home_slider_texts.slide1_desc",
  },
];
</script>
<template>
  <div class="swiper_banner-lg">
    <BaseSwiper :options="sliderSettings">
      <SwiperSlide
        v-for="(item, idx) in sliderList"
        :key="idx"
        :virtualIndex="idx"
        class="swiper-slide"
      >
        <div class="swiper_banner__item">
          <NuxtImg
            quality="80"
            :src="`/images/banner/${item?.image}`"
            :alt="item?.title"
            class="banner-image"
          />

          <div class="swiper_banner_texts">
            <div class="swiper_title">{{ t(item?.title || "") }}</div>
            <div class="swiper_desc">{{ t(item?.desc || "") }}</div>
          </div>
        </div>
      </SwiperSlide>
    </BaseSwiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper_banner-lg {
  position: relative;
  height: 100%;
  .swiper_banner_texts {
    position: relative;
    z-index: 3;
  }
  .swiper_banner__item {
    height: 312px;
    padding: 0px 70px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    .swiper_title {
      color: #fff;
      font-size: 56px;
      font-weight: 600;
    }
    .swiper_desc {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      line-height: 22px;
      max-width: 550px;
    }
  }
  .swiper_banner__item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba($color: #000000, $alpha: 0.3);
    border-radius: 20px;
  }
  .banner-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .swiper-button {
    height: 48px;
    width: 48px;
    position: absolute;
    top: 58%;
    transform: translateY(-100%);
    z-index: 1;
    cursor: pointer;
    color: $dark;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 29px;
    opacity: 1;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: lighten($border-color, 1);
    }
    &.button {
      &-next-banner-lg {
        right: -25px;
      }
      &-prev-banner-lg {
        left: -25px;
      }
    }
    &.swiper-button-disable {
      color: $grey;
      display: none;
    }
  }
}
</style>
