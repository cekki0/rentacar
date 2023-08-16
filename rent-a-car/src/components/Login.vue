<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="Username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="Username"
          v-model="username"
          :class="{ 'is-invalid': usernameError }"
        />
        <div class="invalid-feedback" v-if="usernameError">
          Please provide a valid username.
        </div>
      </div>
      <div class="mb-3">
        <label for="Password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="Password"
          v-model="password"
          :class="{ 'is-invalid': passwordError }"
        />
        <div class="invalid-feedback" v-if="passwordError">
          Password is required.
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="mt-3">
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
      users: [
        {
          username: "user1",
          password: "password1",
          firstName: "John",
          lastName: "Doe",
          gender: "Male",
          dateOfBirth: "1990-01-01",
          role: "Customer",
          rentings: {},
          cart: {},
          facility: {},
          userType: "Golden",
        },
        {
          username: "user2",
          password: "password2",
          firstName: "Jane",
          lastName: "Smith",
          gender: "Female",
          dateOfBirth: "1995-05-15",
          role: "Customer",
          rentings: {},
          cart: {},
          facility: {},
          userType: "Silver",
        },
      ],
    };
  },
  methods: {
    validateForm() {
      let valid = true;

      if (!this.username) {
        this.usernameError = true;
        valid = false;
      } else {
        this.usernameError = false;
      }

      if (!this.password) {
        this.passwordError = true;
        valid = false;
      } else {
        this.passwordError = false;
      }

      return valid;
    },
    async login() {
      try {
        if (this.validateForm()) {
          const res = await this.axios.post(
            "http://localhost:3000/user/login",
            {
              username: this.username,
              password: this.password,
            }
          );
          console.log(res);
          router.push("/");
        }
      } catch (error) {
        alert("Invalid input");
        console.log(error);
      }
    },
  },
};
</script>
