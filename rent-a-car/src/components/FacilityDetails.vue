<template>
  <div class="container">
    <div class="card">
      <img :src="facility.logo" class="card-img-top" alt="Facility Logo" />
      <div class="card-body">
        <h5 class="card-title">{{ facility.name }}</h5>
        <p class="card-text">Location: {{ facility.location }}</p>
        <p class="card-text">
          Working Time: {{ facility.startTime }} - {{ facility.endTime }}
        </p>
        <p class="card-text">Open Status: {{ facility.openStatus }}</p>
        <p class="card-text">Rating: {{ facility.rating }}</p>
      </div>
      <h3>Vehicles:</h3>
      <div v-for="(vehicle, index) in facility.vehicles" :key="index">
        <Vehicle :vehicle="vehicle" />
      </div>
    </div>
    <Comments :kurcina="this.facility.id"></Comments>
    <router-link
      :to="`/comment/createComments/${this.facility.id}`"
      class="btn btn-primary"
    >
      Dodaj komentar
    </router-link>
  </div>
</template>

<script>
import Vehicle from "./Vehicle.vue";
import Comments from "./Comments.vue";
import Orders from "./Orders.vue";
export default {
  data() {
    return {
      facility: {},
      comments: [],
    };
  },
  methods: {
    async fetchFacility(id) {
      try {
        const res = await this.axios.get(
          `http://localhost:3000/facility/facility/${id}`
        );
        this.facility = res.data;
      } catch (error) {
        console.error("Error fetching facility:", error);
      }
    },
    checkIfOpened() {
      const currentTime = new Date();
      const openTime = new Date(`2000-01-01T${this.facility.startTime}`);
      const closedTime = new Date(`2000-01-01T${this.facility.endTime}`);
      console.log(this.facility.startTime);
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
    const id = this.$route.params.id;
    this.fetchFacility(id);
    this.checkIfOpened();
  },

  components: {
    Vehicle,
    Comments,
    Orders,
  },
};
</script>
