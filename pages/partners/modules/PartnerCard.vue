<script lang="ts" setup>
interface IPartner {
  imgName: string;
  name: string;
  location: string;
  totalScore: string;
  averageScore: string;
}
interface IProps {
  item: IPartner;
}
defineProps<IProps>();
</script>
<template>
  <div class="partner_card">
    <div class="image_wrap">
      <nuxt-img
        width="74"
        height="74"
        quality="80"
        :src="`${item.imgName}`"
        class="image"
        :alt="item.name"
        :title="item.name"
      />
    </div>
    <div class="name">{{ item.name }}</div>
    <div class="location">
      <q-icon name="home" color="grey" class="mr-2" />
      {{ item.location }}
    </div>
    <div class="score_wrap">
      <q-icon name="star" color="orange" size="22px" />
      <span class="ml-1">{{ item.averageScore }}</span>
      <span class="ml-1">({{ item.totalScore }} оценок)</span>
    </div>
    <div class="actions_wrap">
      <BaseBtn icon="home" dense square color="grey-4" class="text-dark mr-2" />
      <BaseBtn icon="home" dense square color="grey-4" class="text-dark" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.partner_card {
  background-color: #fff;
  width: 536px;
  height: 214px;
  box-shadow: 10px 9px 19px rgba(0, 0, 0, 0.17);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 24px;
  position: relative;
  .name {
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    margin-top: 10px;
  }
  .location {
    color: $text-grey;
  }
  .score_wrap {
    color: $text-grey;
    display: flex;
    align-items: center;
  }
  .actions_wrap {
    position: absolute;
    right: 24px;
    bottom: 24px;
  }
}
</style>
