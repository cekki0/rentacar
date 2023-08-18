<template>
  <div class="orders">
    <Order v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import Order from "./Order.vue";

export default {
  name: "Orders",
  components: {
    Order,
  },
  props: {
    orders: Object,
  },
};
</script>
