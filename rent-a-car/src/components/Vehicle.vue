<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ vehicle.brand }} {{ vehicle.model }}</h5>
      <p class="card-text">Price: ${{ vehicle.price }}</p>
      <p class="card-text">Type: {{ vehicle.vehicleType }}</p>
      <p class="card-text">Facility: {{ vehicle.facility }}</p>
      <p class="card-text">Gear Shift: {{ vehicle.gearShift }}</p>
      <p class="card-text">Fuel Type: {{ vehicle.fuelType }}</p>
      <p class="card-text">Consumption: {{ vehicle.consumption }}</p>
      <p class="card-text">Number of Doors: {{ vehicle.numDoors }}</p>
      <p class="card-text">Max People: {{ vehicle.numMaxPeople }}</p>
      <p class="card-text">Description: {{ vehicle.description }}</p>
      <p class="card-text">Rent Status: {{ vehicle.rentStatus }}</p>
      <img :src="vehicle.picture" alt="Vehicle Picture" />
      <router-link
        :to="`/manageVehicles/edit/${vehicle.id}`"
        class="btn btn-primary mt-3 me-2"
        >Edit</router-link
      >
      <button class="btn btn-danger mt-3" @click="deleteVehicle">Delete</button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteVehicle() {
      const confirmDelete = confirm(
        "Are you sure you want to delete this vehicle?"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        await this.axios.delete(
          `http://localhost:3000/vehicle/delete/${this.vehicle.id}`
        );
        router.push(`/manageVehicles`);
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        alert("Error deleting vehicle");
      }
    },
  },
};
</script>
