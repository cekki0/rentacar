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
      <div class="row">
        <div
          v-for="(vehicle, index) in facility.vehicles"
          :key="index"
          class="col-md-3 mb-3"
        >
          <Vehicle :vehicle="vehicle" />
        </div>
      </div>
    </div>
    <Comments :kurcina="this.facility.id"></Comments>
    <router-link
      v-if="this.flag"
      :to="`/comment/createComments/${this.facility.id}`"
      class="btn btn-primary"
    >
      Add comment
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
      user: {},
      orders: {},
      flag: false,
    };
  },
  methods: {
    async getUser() {
      try {
        const res = await this.axios.get("http://localhost:3000/user/profile/");
        if (res.data.username) {
          this.user = res.data;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchOrders() {
      try {
        const res = await this.axios.get(`http://localhost:3000/order/orders`);
        this.orders = res.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
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

  async mounted() {
    const id = this.$route.params.id;
    this.fetchFacility(id);
    await this.fetchOrders();
    await this.getUser();
    for (const order of this.orders) {
      if (
        order.userId == this.user.id &&
        order.status == "returned" &&
        this.user.role == "customer" &&
        order.facilityId == this.facility.id
      )
        this.flag = true;
    }
  },

  components: {
    Vehicle,
    Comments,
  },
};
</script>
<style>
.card-img-top {
  max-height: 100px;
  max-width: 100px;
}
</style>
