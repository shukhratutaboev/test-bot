<script setup lang="ts">
import { FormInst, FormItemInst, FormItemRule, useMessage } from "naive-ui";
import validate from "@/utils/validate";
import { resetValidation } from "@/utils/helpers";

const formRef = ref<FormInst | null>(null);
const formValue = ref({
  user: {
    name: "",
    age: "",
  },
  phone: "",
});
const rules = {
  user: {
    name: validate.required,
    age: validate.required,
  },
  phone: [validate.phone],
};

const { fetch: orderFetch, increment, items } = useOrders();

// const { data: ordersRes } = await useAsyncData('test', () => orderFetch());
// const { data: ordersRes } = await useAsyncData('test', () =>
//   Promise.all([orderFetch(), orderFetch()]),
// );
// console.log('ordersRes', ordersRes);
// const [{ data: ordersRes1 }, { data: ordersRes2 }] = await Promise.all([
//   useAsyncData('test', () => orderFetch()),
//   useAsyncData('test2', () => orderFetch()),
// ]);
// console.log('ordersRes1', ordersRes1.value);
// console.log('ordersRes2', ordersRes2.value);

const count = ref<number>(0);

// items.value = ordersRes.value?.items;
// count.value = ordersRes.value?.totalCount || 0;

onMounted(async () => {
  const res = await orderFetch();
  console.log("res", res);
});
</script>
<template>
  items: {{ items }} <br />
  count: {{ count }} <br />
  <button @click="increment">increment</button>
  <br />
  <button @click="$router.push('/orders')">go to orders</button>
</template>
