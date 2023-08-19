<template>
  <div class="container">
    <h2>Orders</h2>
    <div>
      <label>Search by Price: </label>
      <input v-model="priceFrom" type="number" placeholder="From" />
      <input v-model="priceTo" type="number" placeholder="To" />
      <button @click="searchByPrice">Search</button>
    </div>
    <div>
      <label>Search by Date: </label>
      <input v-model="dateFrom" type="date" />
      <input v-model="dateTo" type="date" />
      <button @click="searchByDate">Search</button>
    </div>
    <button @click="sortByDate">Sort by Date</button>
    <button @click="sortByPrice">Sort by Price</button>
    <Orders :orders="filteredOrders"></Orders>

    <h2>Users</h2>
    <div class="col">
      <div v-for="user in users" :key="user.id">
        <User :user="user" />
      </div>
    </div>
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
    };
  },
  async mounted() {
    await this.getManager();
    await this.fetchOrders();
    await this.fetchUsers();
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

      return filtered;
    },
  },
  methods: {
    async getManager() {
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
        this.orders = res.data.filter(
          (order) => order.facilityId == this.user.facilityId
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchUsers() {
      try {
        const res = await this.axios.get(`http://localhost:3000/user/users`);
        const userIds = new Set();
        const filteredUsers = [];
        for (const order of this.orders) {
          if (!userIds.has(order.userId)) {
            filteredUsers.push(
              res.data.find((user) => user.id == order.userId)
            );
            userIds.add(order.userId);
          }
        }
        this.users = filteredUsers;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    searchByPrice() {
      this.fetchOrders();
    },
    searchByDate() {
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
  },
  components: { Orders, User },
};
</script>
