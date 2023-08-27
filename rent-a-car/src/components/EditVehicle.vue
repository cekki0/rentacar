<template>
  <div class="container mt-4">
    <h2>Edit Vehicle</h2>
    <form @submit.prevent="editVehicle">
      <div class="mb-3">
        <label for="brand" class="form-label">Brand:</label>
        <input
          type="text"
          class="form-control"
          id="brand"
          v-model="editedVehicle.brand"
          required
        />
      </div>
      <div class="mb-3">
        <label for="model" class="form-label">Model:</label>
        <input
          type="text"
          class="form-control"
          id="model"
          v-model="editedVehicle.model"
          required
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="editedVehicle.price"
          required
        />
      </div>
      <div class="mb-3">
        <label for="vehicleType" class="form-label">Vehicle Type:</label>
        <select
          class="form-select"
          v-model="editedVehicle.vehicleType"
          required
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Electric">Electric</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="gearShift" class="form-label">Gear Shift:</label>
        <select
          class="form-select"
          id="gearShift"
          v-model="editedVehicle.gearShift"
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
          v-model="editedVehicle.fuelType"
          required
        >
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
          <option value="hybrid">Hybrid</option>
          <option value="gas">Gas</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="consumption" class="form-label">Consumption:</label>
        <input
          type="number"
          class="form-control"
          id="consumption"
          v-model="editedVehicle.consumption"
          required
        />
      </div>
      <div class="mb-3">
        <label for="numDoors" class="form-label">Number of Doors:</label>
        <input
          type="number"
          class="form-control"
          id="numDoors"
          v-model="editedVehicle.numDoors"
          required
        />
      </div>
      <div class="mb-3">
        <label for="numMaxPeople" class="form-label">Max People:</label>
        <input
          type="number"
          class="form-control"
          id="numMaxPeople"
          v-model="editedVehicle.numMaxPeople"
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
          v-model="editedVehicle.picture"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          class="form-control"
          id="description"
          v-model="editedVehicle.description"
          required
          rows="4"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      editedVehicle: {
        brand: "",
        model: "",
        price: "",
        vehicleType: "",
        fuelType: "",
        consumption: "",
        gearShift: "",
        numDoors: 0,
        numMaxPeople: 1,
        picture: "",
        description: "",
        rentStatus: "",
      },
    };
  },
  methods: {
    async editVehicle() {
      try {
        await this.axios.patch(
          `http://localhost:3000/vehicle/edit/${this.$route.params.id}`,
          this.editedVehicle
        );
        router.push(`/manageVehicles`);
      } catch (error) {
        alert("Error editing vehicle");
        console.error("Error editing vehicle:", error);
      }
    },
  },
  async mounted() {
    try {
      const res = await this.axios.get(
        `http://localhost:3000/vehicle/vehicle/${this.$route.params.id}`
      );
      this.editedVehicle = res.data;
    } catch (error) {
      alert("Error fetching vehicle");
      console.error("Error editing vehicle:", error);
    }
  },
};
</script>
