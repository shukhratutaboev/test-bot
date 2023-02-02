<script lang="ts" setup>
const menu = ref(false);

const { locales, locale, setLocale } = useI18n();

interface ILocale {
  code: string;
  name: string;
  shortName: string;
  icon: string;
}

const availableLocales = computed(() => {
  return [...locales.value]?.filter(
    (i: any) => i.code !== locale.value
  ) as ILocale[];
});
const currentLocale = computed(() => {
  return [...locales.value]?.find(
    (i: any) => i.code === locale.value
  ) as ILocale;
});
const { fetchRegions } = useRegions();

async function onHandleChangeLocale(code: string) {
  await setLocale(code);
  fetchRegions(true);
}
</script>

<template>
  <q-btn-dropdown
    v-model="menu"
    v-bind="$attrs"
    dropdown-icon="keyboard_arrow_down"
    class="base_lang_switcher_btn"
    content-class="base_lang_switcher_btn-dropdown"
    no-caps
    :menu-offset="[0, 1]"
    flat
  >
    <template #label>
      <nuxt-img
        :src="currentLocale.icon"
        :alt="currentLocale.code + '-locale-icon'"
        class="flag-icon mr-2"
        width="17px"
        height="17px"
        quality="10"
      />
      <div class="title">
        {{ currentLocale?.name }}
      </div>
    </template>
    <q-list>
      <q-item
        v-for="(lang, idx) in availableLocales"
        :key="idx"
        clickable
        @click="onHandleChangeLocale(lang.code)"
      >
        <q-item-section>
          <q-item-label class="lang-item">
            <nuxt-img
              :src="lang.icon"
              :alt="lang.code + '-locale-icon'"
              width="17px"
              height="17px"
              class="flag-icon"
              quality="10"
            />
            {{ lang.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<style scoped lang="scss">
.base_lang_switcher_btn {
  .flag-icon {
    margin-right: 10px;
  }
  .q-icon {
    color: $grey-7;
    // margin-left: 15px;
  }
  &-dropdown {
    .flag-icon {
      margin-right: 10px;
    }
    .q-item {
      padding-top: 0;
      padding-bottom: 0;
      min-height: 38px;
      padding-left: 20px;
    }
    .lang-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>
