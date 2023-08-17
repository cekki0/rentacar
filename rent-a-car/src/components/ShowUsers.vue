<template>
  <div class="container">
    <div class="search-bar">
      <label>Search by:</label>
      <input v-model="searchQuery.firstName" placeholder="First Name" />
      <input v-model="searchQuery.lastName" placeholder="Last Name" />
      <input v-model="searchQuery.username" placeholder="Username" />
    </div>
    <div class="sort-bar">
      <label>Sort by:</label>
      <select v-model="sortOrder">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <select v-model="sortBy">
        <option value="username">Username</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="points">Points</option>
      </select>
    </div>
    <div class="filter-bar">
      <label>Filter by role:</label>
      <select v-model="filterByRole">
        <option value="">All Roles</option>
        <option value="customer">Customer</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <label>Filter by user type:</label>
      <select v-model="filterByUserType">
        <option value="">All Types</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
      </select>
    </div>
    <div class="col">
      <div v-for="user in filteredAndSortedUsers" :key="user.id">
        <User :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/User";

export default {
  components: {
    User,
  },
  data() {
    return {
      users: [],
      searchQuery: {
        firstName: "",
        lastName: "",
        username: "",
      },
      sortOrder: "asc",
      sortBy: "username",
      filterByRole: "",
      filterByUserType: "",
    };
  },
  computed: {
    filteredAndSortedUsers() {
      let filteredUsers = this.users.filter((user) => {
        return (
          (this.searchQuery.firstName === "" ||
            user.firstName.includes(this.searchQuery.firstName)) &&
          (this.searchQuery.lastName === "" ||
            user.lastName.includes(this.searchQuery.lastName)) &&
          (this.searchQuery.username === "" ||
            user.username.includes(this.searchQuery.username)) &&
          (this.filterByRole === "" || user.role === this.filterByRole) &&
          (this.filterByUserType === "" ||
            user.userType === this.filterByUserType)
        );
      });

      return filteredUsers.sort((a, b) => {
        const aValue = a[this.sortBy];
        const bValue = b[this.sortBy];
        if (this.sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    },
  },
  async mounted() {
    try {
      const response = await this.axios.get("http://localhost:3000/user/users");
      this.users = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
};
</script>

<style scoped>
.search-bar,
.sort-bar,
.filter-bar {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-right: 5px;
}
</style>
