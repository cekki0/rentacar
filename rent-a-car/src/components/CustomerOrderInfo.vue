<template>
  <div class="container">
    <h2>Orders</h2>
    <div>
      <label>Search by Price:</label>
      <input v-model="priceFrom" type="number" placeholder="From" />
      <input v-model="priceTo" type="number" placeholder="To" />
      <button @click="searchByPrice">Search</button>
    </div>
    <div>
      <label>Search by Date:</label>
      <input v-model="dateFrom" type="date" />
      <input v-model="dateTo" type="date" />
      <button @click="searchByDate">Search</button>
    </div>
    <div>
      <label>Search by Facility Name:</label>
      <input
        v-model="facilityNameSearch"
        type="text"
        placeholder="Facility Name"
      />
      <button @click="searchByFacilityName">Search</button>
    </div>
    <button @click="sortByDate">Sort by Date</button>
    <button @click="sortByPrice">Sort by Price</button>
    <button @click="sortByFacilityName">Sort by Facility Name</button>
    <Orders :orders="filteredOrders"></Orders>
  </div>
</template>

<script>
import Orders from "../components/Orders.vue";
import User from "../components/User.vue";

export default {
  data() {
    return {
      user: {},
      orders: [],
      users: [],
      priceFrom: null,
      priceTo: null,
      dateFrom: null,
      dateTo: null,
      facilityNameSearch: "",
    };
  },
  async mounted() {
    await this.getUser();
    await this.fetchOrders();
    await this.getUser();
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders;

      if (this.priceFrom !== null && this.priceTo !== null) {
        filtered = filtered.filter(
          (order) =>
            order.price >= parseFloat(this.priceFrom) &&
            order.price <= parseFloat(this.priceTo)
        );
      }

      if (this.dateFrom !== null && this.dateTo !== null) {
        const from = new Date(this.dateFrom);
        const to = new Date(this.dateTo);
        filtered = filtered.filter(
          (order) =>
            new Date(order.orderStartDate) >= from &&
            new Date(order.orderEndDate) <= to
        );
      }

      if (this.facilityNameSearch !== "") {
        filtered = filtered.filter((order) =>
          order.facility.name
            .toLowerCase()
            .includes(this.facilityNameSearch.toLowerCase())
        );
      }

      return filtered;
    },
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
        this.orders = res.data.filter((order) => order.userId == this.user.id);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    searchByPrice() {
      this.fetchOrders();
    },
    searchByDate() {
      this.fetchOrders();
    },
    searchByFacilityName() {
      this.fetchOrders();
    },
    sortByDate() {
      this.orders.sort(
        (a, b) => new Date(a.orderStartDate) - new Date(b.orderStartDate)
      );
    },
    sortByPrice() {
      this.orders.sort((a, b) => a.price - b.price);
    },
    sortByFacilityName() {
      this.orders.sort((a, b) => {
        const facilityNameA = a.facility.name.toLowerCase();
        const facilityNameB = b.facility.name.toLowerCase();
        return facilityNameA.localeCompare(facilityNameB);
      });
    },
  },
  components: { Orders, User },
};
</script>
