<template>
  <div class="container mt-4">
    <h2>Register Facility</h2>
    <form @submit.prevent="createFacility">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="facility.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Location:</label>
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="facility.location"
          required
        />
      </div>
      <div class="mb-3">
        <label for="startTime" class="form-label">Open time:</label>
        <input
          type="time"
          class="form-control"
          id="startTime"
          v-model="facility.startTime"
          required
        />
      </div>
      <div class="mb-3">
        <label for="endTime" class="form-label">Close time:</label>
        <input
          type="time"
          class="form-control"
          id="endTime"
          v-model="facility.endTime"
          required
        />
      </div>
      <div class="mb-3">
        <label for="logo" class="form-label">Logo:</label>
        <input
          type="text"
          class="form-control"
          id="logo"
          v-model="facility.logo"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
  <div class="container mt-4">
    <label for="managerSelect" class="form-label">Manager:</label>
    <select
      id="managerSelect"
      class="form-select"
      v-model="selectedManager"
      required
    >
      <option v-for="manager in managers" :value="manager.username">
        {{ manager.username }}
      </option>
    </select>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      facility: {
        name: "",
        location: "",
        startTime: "",
        endTime: "",
        logo: "",
      },
      managers: {},
      selectedManager: {},
    };
  },
  methods: {
    async createFacility() {
      try {
        await this.axios.post(
          "http://localhost:3000/facility/create",
          this.facility
        );
        router.push("/");
      } catch (error) {
        alert("invalid input");
        console.log(error);
      }
    },
    async fetchManagers() {
      try {
        const res = await this.axios.get(`http://localhost:3000/user/managers`);
        this.managers = res.data;
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    },
  },
  mounted() {
    this.fetchManagers();
  },
};
</script>
