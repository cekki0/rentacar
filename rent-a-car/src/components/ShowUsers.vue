<template>
  <div class="container">
    <h2>All Users</h2>
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
    </div>
    <div class="filter-bar">
      <label>Filter by user type:</label>
      <select v-model="filterByUserType">
        <option value="">All Types</option>
        <option value="default">Default</option>
      </select>
    </div>
    <div class="row">
      <div
        v-for="user in filteredAndSortedUsers"
        :key="user.id"
        class="col-md-3 mb-3"
      >
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
            user.firstName
              .toLowerCase()
              .includes(this.searchQuery.firstName.toLowerCase())) &&
          (this.searchQuery.lastName === "" ||
            user.lastName
              .toLowerCase()
              .includes(this.searchQuery.lastName.toLowerCase())) &&
          (this.searchQuery.username === "" ||
            user.username
              .toLowerCase()
              .includes(this.searchQuery.username.toLowerCase())) &&
          (this.filterByRole === "" || user.role === this.filterByRole) &&
          (this.filterByUserType === "" ||
            user.userType === this.filterByUserType)
        );
      });

      return filteredUsers.sort((a, b) => {
        if (this.sortBy === "points") {
          const aValue = a.points;
          const bValue = b.points;
          if (this.sortOrder === "asc") {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        } else {
          const aValue = a[this.sortBy];
          const bValue = b[this.sortBy];
          if (this.sortOrder === "asc") {
            return aValue.localeCompare(bValue, undefined, {
              sensitivity: "base",
            });
          } else {
            return bValue.localeCompare(aValue, undefined, {
              sensitivity: "base",
            });
          }
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
