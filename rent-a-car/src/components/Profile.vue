<template>
  <div class="container">
    <h2>User Profile</h2>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
        <p class="card-text">
          Username: {{ user.username }}<br />
          First name: {{ user.firstName }}<br />
          Last name: {{ user.lastName }}<br />
          Gender: {{ user.gender }}<br />
          Date of Birth: {{ user.dateOfBirth }}<br />
          Role: {{ user.role }}<br />
          <template v-if="user.role === 'customer'">
            Points: {{ user.points }}<br />
          </template>
          <template v-if="user.role === 'customer'">
            User Type: {{ user.userType }}
          </template>
        </p>
        <button class="btn btn-primary" @click="editProfile()">
          Edit Profile
        </button>
        <button class="btn btn-primary" @click="changePassword()">
          Change password
        </button>
      </div>
    </div>
    <CustomerOrderInfo v-if="user.role === 'customer'" />
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import CustomerOrderInfo from "../components/CustomerOrderInfo.vue";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    editProfile() {
      router.push("/profile/edit");
    },
    changePassword() {
      router.push("/profile/changePassword");
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/user/profile/`)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  },
  components: {
    CustomerOrderInfo,
  },
};
</script>
