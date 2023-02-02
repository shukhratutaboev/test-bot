<script setup lang="ts">
import { SwiperSlide } from "swiper/vue";
const { t } = useI18n();
const { useQuasar } = useUtils();
const $q = useQuasar();

const sliderSettings = {
  slidesPerView: 1,

  navigation: $q.platform.is.desktop && {
    nextEl: ".button-next-banner-lg",
    prevEl: ".button-prev-banner-lg",
  },
};
const sliderList = [
  {
    id: 0,
    image: "banner-sm-1.png",
    title: "solar_power_plants",
  },
  {
    id: 1,
    image: "banner-sm-2.png",
    title: "solar_water_heaters",
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
        <NuxtLink
          :to="localePath('/category') + '?type=' + item.id"
          class="swiper_banner__item"
        >
          <NuxtImg
            quality="80"
            :src="`/images/banner/${item?.image}`"
            :alt="item?.title"
            class="banner-image"
          />

          <div class="swiper_banner_texts">
            <div class="swiper_title">{{ t(item?.title || "") }}</div>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </BaseSwiper>
    <template v-if="$q.platform.is.desktop">
      <button class="swiper-button button-prev-banner-lg">
        <q-icon name="chevron_left" />
      </button>
      <button class="swiper-button button-next-banner-lg">
        <q-icon name="chevron_right" />
      </button>
    </template>
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
    padding: 0px 30px;
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    .swiper_title {
      color: #fff;
      font-size: 30px;
      font-weight: 600;
      margin-top: 30px;
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
    background: rgba($color: #000000, $alpha: 0.5);
    border-radius: 20px;
    display: block;
  }
  .banner-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .swiper-button {
    height: 30px;
    width: 30px;
    position: absolute;
    top: 55%;
    transform: translateY(-100%);
    z-index: 1;
    cursor: pointer;
    color: $dark;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 29px;
    opacity: 1;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: lighten($border-color, 1);
    }
    &.button {
      &-next-banner-lg {
        right: -15px;
      }
      &-prev-banner-lg {
        left: -15px;
      }
    }
    &.swiper-button-disable {
      color: $grey;
      display: none;
    }
  }
}
</style>
