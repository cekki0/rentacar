<template>
  <div class="container">
    <div class="card">
      <img :src="facility.logo" class="card-img-top" alt="Facility Logo" />
      <div class="card-body">
        <h5 class="card-title">{{ facility.name }}</h5>
        <p class="card-text">Location: {{ facility.location }}</p>
        <p class="card-text">Rating: {{ facility.rating }}</p>
        <p class="card-text">
          Working Time: {{ facility.startTime }} - {{ facility.endTime }}
        </p>
        <p class="card-text">Open Status: {{ facility.openStatus }}</p>
      </div>
      <h3>Vehicles:</h3>
      <div v-for="(vehicle, index) in facility.vehicles" :key="index">
        <Vehicle :vehicle="vehicle" />
      </div>
    </div>
    <Comments></Comments>
    <router-link to="/comment/createComments" class="btn btn-primary">
      Dodaj komentar
    </router-link>
  </div>
</template>

<script>
import Vehicle from "./Vehicle.vue";
import Comments from "./Comments.vue";

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
  },

  mounted() {
    const id = this.$route.params.id;
    this.fetchFacility(id);
  },

  components: {
    Vehicle,
    Comments,
  },
};
</script>
