<script lang="ts" setup>
const { t } = useI18n();
const emit = defineEmits(["search", "clear"]);
const { scrollTo } = useUtils();
interface INavList {
  label: string;
  to?: string;
  scroll?: string;
}
const navList: INavList[] = [
  {
    label: "About_us",
    to: "/about-us",
  },
  {
    label: "Regulatory_documents",
    to: "/regulations",
  },
];

const { formatPhoneNumber, phoneNumber } = useUtils();
const { selectedRegion, fetchRegions, setRegionId } = useRegions();
useAsyncData("regions", () => fetchRegions());

const menuList = [
  {
    label: "Солнечные панели",
    img: "solar-panel",
    type: 0,
    items: [
      {
        label: "bla",
        to: "/category",
      },
    ],
  },
  {
    label: "Солнечные водонагреватели",
    img: "hydraulic-energy",
    type: 2,
    items: [],
  },
  // {
  //   label: "Ветряные станции",
  //   img: "wind-turbine",
  //   items: [],
  // },
];

function clickCalculate() {
  const content: any = document.getElementById("calculate");
  const offsetTop: number = parseInt(content.offsetTop);
  scrollTo(offsetTop);
}
</script>

<template>
  <div class="header">
    <div class="header--top">
      <div class="container">
        <nav class="nav_menu">
          <NuxtLink
            v-for="(item, idx) in navList"
            :key="idx"
            :to="localePath(item.to)"
            class="nav_menu--item"
            active-class="active"
          >
            {{ t(item.label) }}
          </NuxtLink>

          <button @click="clickCalculate">
            {{ t("Cost_calculation") }}
          </button>
        </nav>
        <a :href="`tel:+${phoneNumber}`" class="contact">
          <BaseIcon name="Phone" class="text-blue-500" />
          <span class="phone-number">
            {{ formatPhoneNumber(phoneNumber) }}
          </span>
        </a>
        <BaseLangSwitcherBtn dense style="margin-left: -10px" />
      </div>
    </div>
    <div class="header--middle">
      <div class="container">
        <BaseLogo />
        <!-- <BaseSearchInput @search="emit('search')" @clear="emit('clear')" /> -->
        <ul class="actions">
          <li
            v-for="item in [
              {
                href: 'https://dev-cc.taqsim.uz/',
                icon: 'User',
                label: 'Profile',
              },
            ]"
            :key="item.label"
          >
            <BaseLink
              :icon="item.icon"
              :label="item.label"
              :href="item.href"
              target="_blank"
              vertical
              font-size="16px"
              class="hover:text-blue-700"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="header--bottom">
      <div class="container">
        <BaseSelectByUrl
          class="mr-8"
          ref="regionsSelectRef"
          :model-value="selectedRegion"
          required
          borderless
          :placeholder="t('Choose_region')"
          :cb-func="() => fetchRegions()"
          option-value="id"
          option-label="name"
          emit-value
          map-options
          dense
          prepend
          @update:model-value="setRegionId($event)"
        >
          <template #prepend>
            <BaseIcon
              name="Location"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            />
          </template>
        </BaseSelectByUrl>
        <BaseBtnDropdown
          v-for="(item, idx) in menuList"
          class="ml-3"
          :to="localePath('/category') + '?type=' + item.type"
        >
          <template #label>
            <nuxt-img
              :src="`/images/${item.img}.png`"
              :alt="`${item.img}-menu-icon`"
              width="24"
              height="24"
              class="mr-2"
              quality="10"
            />
            {{ item.label }}
          </template>
          <!-- <q-list dense>
            <q-item
              clickable
              :to="localePath('/category') + '?type=' + (idx + 1)"
            >
              <q-item-section>
                <q-item-label>Сетевые системы</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :to="localePath('/category') + '?type=' + (idx + 1)"
            >
              <q-item-section>
                <q-item-label>Автономные системы</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :to="localePath('/category') + '?type=' + (idx + 1)"
            >
              <q-item-section>
                <q-item-label>Гибридные системы</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> -->
        </BaseBtnDropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  .container {
    @apply flex items-center;
    height: 100%;
  }
  &--top {
    height: 38px;
    border-bottom: 1px solid $border-color;
    .nav_menu {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      &--item {
        &.active {
          background: linear-gradient(92.14deg, #6850ff -4.77%, #fb29b3 132.3%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        &:not(:last-child) {
          margin-right: 24px;
        }
      }
    }
    .contact {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      display: flex;
      align-items: center;
      margin-left: auto;
      position: relative;
      padding-left: 26px;
      margin-right: 20px;
    }
    :deep(.base_lang_switcher_btn) {
      height: 30px;
    }
  }

  &--middle {
    .container {
      justify-content: space-between;
    }
    // padding: 19px 0;
    height: 85px;
    .actions {
      display: flex;
      li {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          &:after {
            content: "";
            display: block;
            width: 1px;
            height: 28px;
            background: $border-color;
            margin: 0 16px;
          }
        }
      }
    }
  }

  &--bottom {
    border-bottom: 1px solid $border-color;
  }
}
</style>
