<script setup lang="ts">
import { IOrganization, IOrgSeller } from "@/types/organization.types";
import { SwiperSlide } from "swiper/vue";

const { useQuasar } = useUtils();
const $q = useQuasar();

const sliderSettings = {
  spaceBetween: 15,
  breakpoints: {
    340: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    767: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
    1199: {
      slidesPerView: 4,
    },
  },
  isCustomNav: false,
  pagination: false,
  // pagination: { clickable: true },
  navigation: $q.platform.is.desktop && {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
};

const desc =
  "All Solar — магазин товаров альтернативной источников энергии. Гарантия на все товары 10 лет.";
const link_label = "allsolar.uz";
const bottom_link_label = "Посмотреть все товары";

const organizations = ref<any>([]);

const organizationStore = useOrganization();
async function fetchOrganizations() {
  const orgRes = await organizationStore.fetch();
  if (!Array.isArray(orgRes.items)) return;
  let index = 1;

  for (const item of orgRes.items) {
    organizations.value.push({
      img: `partner${index}`,
      name: item?.organizationName,
      desc: item?.contact?.description || "No description",
      link: {
        label: link_label,
        to: "/",
      },
      bottom_link: {
        label: bottom_link_label,
        to: `/partners/${item.id}`,
      },
    });
    index++;
    index > 4 && (index = 1);
  }
}

onMounted(async () => {
  fetchOrganizations();
});
</script>
<template>
  <div class="swiper_our_partners">
    <BaseSwiper :options="sliderSettings">
      <SwiperSlide
        v-for="(item, idx) in organizations"
        :key="idx"
        :virtualIndex="idx"
        class="swiper-slide"
      >
        <div class="card">
          <div class="header">
            <NuxtImg
              width="54"
              height="54"
              quality="80"
              class="mr-4"
              :src="`/images/partners/${item.img}.png`"
              :alt="item.name"
            />
            <div class="text_wrap">
              <div class="name">{{ item.name }}</div>
              <BaseLink
                :label="item.link.label"
                class="text-primary"
                :to="localePath(item.link.to)"
              />
            </div>
          </div>
          <div class="desc">{{ item.desc }}</div>
          <BaseLink
            :label="item.bottom_link.label"
            class="text-green-5"
            qIconColor="text-green-5"
            :to="localePath(item.bottom_link.to)"
            q-icon-right="chevron_right"
          />
        </div>
      </SwiperSlide>
    </BaseSwiper>
    <template v-if="$q.platform.is.desktop">
      <button class="swiper-button button-prev">
        <q-icon name="chevron_left" />
      </button>
      <button class="swiper-button button-next">
        <q-icon name="chevron_right" />
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.swiper_our_partners {
  position: relative;
  .swiper-button {
    height: 48px;
    width: 48px;
    position: absolute;
    top: 52%;
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
      &-next {
        right: -25px;
      }
      &-prev {
        left: -25px;
      }
    }
    &.swiper-button-disable {
      color: $grey;
      display: none;
    }
  }
  .card {
    padding: 24px;
    border: 1px solid $border-color;
    border-radius: 24px;
    .header {
      display: flex;
      .name {
        font-weight: 700;
        font-size: 21px;
        line-height: 27px;
        margin-bottom: 2px;
      }
    }
    .desc {
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      margin-top: 21px;
      margin-bottom: 18px;
      height: 42px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
