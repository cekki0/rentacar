<template>
  <div class="card">
    <img :src="facility.logo" class="card-img-top" alt="Facility Logo" />
    <div class="card-body">
      <h5 class="card-title">{{ facility.name }}</h5>
      <p class="card-text">{{ facility.location }}</p>
      <p class="card-text">Status: {{ facility.openStatus }}</p>
      <p class="card-text">Rating: {{ facility.rating }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facility: {
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
