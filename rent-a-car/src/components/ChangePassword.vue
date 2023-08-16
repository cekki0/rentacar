<template>
  <div class="container">
    <h2>Change Password</h2>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="changePassword">
          <div class="mb-3">
            <label for="OldPassword" class="form-label">Old Password</label>
            <input
              type="password"
              class="form-control"
              id="OldPassword"
              v-model="oldPassword"
            />
          </div>
          <div class="mb-3">
            <label for="NewPassword" class="form-label">New Password</label>
            <input
              type="password"
              class="form-control"
              id="NewPassword"
              v-model="newPassword"
            />
          </div>
          <div class="mb-3">
            <label for="ConfirmPassword" class="form-label"
              >Confirm New Password</label
            >
            <input
              type="password"
              class="form-control"
              id="ConfirmPassword"
              v-model="confirmPassword"
            />
            <div class="text-danger" v-if="newPassword !== confirmPassword">
              Passwords do not match.
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      editedUser: {
        password: "",
      },
      oldUser: {},
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  mounted() {
    this.axios
      .get(`http://localhost:3000/user/profile/`)
      .then((response) => {
        this.oldUser = response.data;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  },
  methods: {
    async logout() {
      await this.axios.get("http://localhost:3000/user/logout");
      this.authorized = false;
    },
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Passwords does not match");
        return;
      }

      if (this.oldUser.password != this.oldPassword) {
        alert("Incorrect old password");
        return;
      }

      this.editedUser.password = this.newPassword;

      try {
        const response = await this.axios.patch(
          `http://localhost:3000/user/profile/changePassword`,
          this.editedUser
        );

        if (response.status === 200) {
          this.logout();
          this.$router.push(`/login/`);
        } else {
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>
