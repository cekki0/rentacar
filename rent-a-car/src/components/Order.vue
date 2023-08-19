<template>
  <div class="card">
    <div class="card-body">
      <p class="card-text">
        <strong>Order Identificator:</strong> {{ order.identificator }}
      </p>
      <p class="card-text">
        <strong>Vehicles rented from:</strong> {{ order.orderStartDate }} to
        {{ order.orderEndDate }}
      </p>
      <p class="card-text"><strong>Price:</strong> ${{ order.price }}</p>
      <p class="card-text">
        <strong>User:</strong>
        {{ getUserById(order.userId) }}
      </p>
      <p class="card-text">
        <strong>Facility:</strong>
        {{ order.facility.name }}
      </p>
      <p class="card-text"><strong>Status:</strong> {{ order.status }}</p>
    </div>
    <div class="row">
      <div
        v-for="vehicle in order.vehicles"
        :key="vehicle.id"
        class="col-md-3 mb-3"
      >
        <VehicleMinimalDetail :vehicle="vehicle" />
      </div>
    </div>
  </div>
</template>

<script>
import VehicleMinimalDetail from "../components/VehicleMinimalDetail.vue";
export default {
  data() {
    return {
      users: [],
      orders: {},
    };
  },
  name: "Order",
  props: {
    order: Object,
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await this.axios.get(`http://localhost:3000/user/users`);
        this.users = res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    getUserById(userId) {
      const user = this.users.find((user) => user.id === userId);
      return user ? user.firstName + " " + user.lastName : "User not found";
    },
    formatDateTime(dateTime) {
      const formattedDateTime = new Date(dateTime).toLocaleString();
      return formattedDateTime;
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
  components: {
    VehicleMinimalDetail,
  },
};
</script>
