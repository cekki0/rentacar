<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">Rent A Car</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!authorized">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="user.role === 'admin'">
              <router-link to="/createFacility" class="nav-link"
                >Create Facility</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'admin'">
              <router-link to="/registerManager" class="nav-link"
                >Register Manager</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'manager'">
              <router-link to="/allComments" class="nav-link"
                >Review Comments</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'admin'">
              <router-link to="/allCommentsAdmin" class="nav-link"
                >All Comments</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'admin'">
              <router-link to="/showUsers" class="nav-link"
                >Show users</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'manager'">
              <router-link to="/manageVehicles" class="nav-link"
                >Manage vehicles</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'manager'">
              <router-link to="/managerInfo" class="nav-link"
                >Orders Info</router-link
              >
            </li>
            <li class="nav-item" v-if="user.role === 'manager'">
              <router-link
                :to="`/facility/${user.facilityId}`"
                class="nav-link"
              >
                My Facility
              </router-link>
            </li>
            <li class="nav-item" v-if="authorized">
              <router-link to="/profile" class="nav-link">Profile</router-link>
            </li>
            <li class="nav-item" v-if="authorized">
              <div class="nav-link" @click="logout">Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      authorized: false,
      user: "",
    };
  },
  methods: {
    async logout() {
      await this.axios.get("http://localhost:3000/user/logout");
      this.authorized = false;
      this.user = {};
      this.$router.push("/");
    },
  },
  watch: {
    "$route.params": {
      async handler(val) {
        try {
          const res = await this.axios.get(
            "http://localhost:3000/user/profile/"
          );
          if (res.data.username) {
            this.authorized = true;
            this.user = res.data;
          }
        } catch (error) {}
      },
    },
  },
};
</script>

<style scoped>
.nav-link:hover {
  cursor: pointer;
}
</style>
