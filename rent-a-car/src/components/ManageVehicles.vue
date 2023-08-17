<template>
  <div class="container mt-4">
    <h2>Add Vehicle</h2>
    <form @submit.prevent="addVehicle">
      <div class="mb-3">
        <label for="brand" class="form-label">Brand:</label>
        <input
          type="text"
          class="form-control"
          id="brand"
          v-model="vehicle.brand"
          required
        />
      </div>
      <div class="mb-3">
        <label for="model" class="form-label">Model:</label>
        <input
          type="text"
          class="form-control"
          id="model"
          v-model="vehicle.model"
          required
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="vehicle.price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="vehicleType" class="form-label">Vehicle Type:</label>
        <input
          type="text"
          class="form-control"
          id="vehicleType"
          v-model="vehicle.vehicleType"
          required
        />
      </div>
      <div class="mb-3">
        <label for="gearShift" class="form-label">Gear Shift:</label>
        <select
          class="form-select"
          id="gearShift"
          v-model="vehicle.gearShift"
          required
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="fuelType" class="form-label">Fuel Type:</label>
        <select
          class="form-select"
          id="fuelType"
          v-model="vehicle.fuelType"
          required
        >
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="consumption" class="form-label">Consumption:</label>
        <input
          type="number"
          class="form-control"
          id="consumption"
          v-model="vehicle.consumption"
          required
        />
      </div>
      <div class="mb-3">
        <label for="numDoors" class="form-label">Number of Doors:</label>
        <input
          type="number"
          class="form-control"
          id="numDoors"
          v-model="vehicle.numDoors"
          required
        />
      </div>
      <div class="mb-3">
        <label for="numMaxPeople" class="form-label">Max People:</label>
        <input
          type="number"
          class="form-control"
          id="numMaxPeople"
          v-model="vehicle.numMaxPeople"
          required
          min="1"
        />
      </div>
      <div class="mb-3">
        <label for="picture" class="form-label">Picture:</label>
        <input
          type="text"
          class="form-control"
          id="picture"
          v-model="vehicle.picture"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          class="form-control"
          id="description"
          v-model="vehicle.description"
          required
          rows="4"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Vehicle</button>
    </form>
    <div class="col">
      <div v-for="vehicle in vehicles">
        <Vehicle :vehicle="vehicle" />
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Vehicle from "../components/Vehicle.vue";
export default {
  data() {
    return {
      vehicle: {
        brand: "",
        model: "",
        price: "",
        vehicleType: "",
        fuelType: "",
        consumption: "",
        gearShift: "",
        numDoors: 0,
        numMaxPeople: 1,
        description: "",
        picture: "",
        rentStatus: "",
      },
      vehicles: {},
    };
  },
  mounted() {
    this.fetchVehicles();
  },
  methods: {
    async addVehicle() {
      if (!this.validateForm()) {
        alert("Please fill out all fields correctly.");
        return;
      }
      try {
        await this.axios.post(
          `http://localhost:3000/vehicle/create`,
          this.vehicle
        );
        this.$router.push("/manageVehicles");
      } catch (error) {
        console.error("Error adding vehicle:", error);
      }
    },
    async fetchVehicles() {
      try {
        const res = await this.axios.get(
          `http://localhost:3000/vehicle/vehicles`
        );
        this.vehicles = res.data;
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    },
    validateForm() {
      return (
        this.vehicle.brand &&
        this.vehicle.model &&
        this.vehicle.price &&
        this.vehicle.vehicleType &&
        this.vehicle.fuelType &&
        this.vehicle.consumption &&
        this.vehicle.gearShift &&
        this.vehicle.numDoors > 0 &&
        this.vehicle.numMaxPeople > 0 &&
        this.vehicle.description
      );
    },
  },
  components: { Vehicle },
};
</script>
