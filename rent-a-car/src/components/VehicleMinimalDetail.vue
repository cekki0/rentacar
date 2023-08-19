<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ vehicle.brand }} {{ vehicle.model }}</h5>
      <p class="card-text">Price: ${{ vehicle.price }}</p>
      <p class="card-text">Type: {{ vehicle.vehicleType }}</p>
      <img :src="vehicle.picture" class="card-img-top" alt="Vehicle Picture" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.card-img-top {
  max-height: 100px;
  max-width: 100px;
}
</style>
