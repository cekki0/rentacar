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
      <p class="card-text"><strong>Status:</strong> {{ order.status }}</p>
    </div>
  </div>
</template>

<script>
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
};
</script>
