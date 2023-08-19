<template>
  <div class="container">
    <h2>Orders</h2>
    <Orders :orders="orders"></Orders>

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
    };
  },
  async mounted() {
    await this.getManager();
    await this.fetchOrders();
    await this.fetchUsers();
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
  },
  components: { Orders, User },
};
</script>
