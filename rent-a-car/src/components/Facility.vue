<template>
  <div class="card">
    <img :src="logo" class="card-img-top" alt="Facility Logo" />
    <div class="card-body">
      <h5 class="card-title">{{ facility.name }}</h5>
      <p class="card-text">{{ facility.location }}</p>
      <p class="card-text">Rating: {{ facility.rating }}</p>
      <p class="card-text">Status: {{ facility.openStatus }}</p>
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
  methods: {
    checkIfOpened() {
      const currentTime = new Date();
      const openTime = new Date(`2000-01-01T${this.facility.startTime}`);
      const closedTime = new Date(`2000-01-01T${this.facility.endTime}`);
      console.log("Current Time:", currentTime);
      console.log("Open Time:", openTime);
      console.log("Closed Time:", closedTime);
      if (
        currentTime.getHours() >= openTime.getHours() &&
        currentTime.getHours() <= closedTime.getHours()
      ) {
        this.facility.openStatus = "Opened";
      } else {
        this.facility.openStatus = "Closed";
      }
    },
  },
  mounted() {
    this.checkIfOpened();
  },
};
</script>
