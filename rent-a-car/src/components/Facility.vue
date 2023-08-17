<template>
  <div class="card">
    <img :src="logo" class="card-img-top" alt="Facility Logo" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ location }}</p>
      <p class="card-text">Rating: {{ rating }}</p>
      <p class="card-text">Status: {{ facilityStatus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logo: String,
    name: String,
    location: String,
    rating: String,
    startTime: String,
    endTime: String,
  },
  computed: {
    facilityStatus() {
      const currentTime = new Date();
      const startTime = new Date(`2000-01-01T${this.startTime}`);
      const endTime = new Date(`2000-01-01T${this.endTime}`);

      if (currentTime >= startTime && currentTime <= endTime) {
        return "OTVORENO";
      } else {
        return "ZATVORENO";
      }
    },
  },
};
</script>
