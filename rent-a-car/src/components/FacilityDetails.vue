<template>
  <div class="container">
    <div class="card">
      <img :src="facility.logo" class="card-img-top" alt="Facility Logo" />
      <div class="card-body">
        <h5 class="card-title">{{ facility.name }}</h5>
        <p class="card-text">Location: {{ facility.location }}</p>
        <p class="card-text">Rating: {{ facility.rating }}</p>
        <p class="card-text">Working Time: {{ facility.workingTime }}hours</p>
        <p class="card-text">Open Status: {{ facility.openStatus }}</p>
      </div>
      <h3>Vehicles:</h3>
      <div v-for="(vehicle, index) in facility.vehicles" :key="index">
        <Vehicle :vehicle="vehicle" />
      </div>
    </div>
  </div>
</template>

<script>
import Vehicle from "./Vehicle.vue";

export default {
  data() {
    return {
      facility: {
        index: 0,
        name: "Facility 3",
        vehicles: [
          {
            brand: "Ford",
            model: "Escape",
            price: 120,
            vehicleType: "SUV",
            gearShift: "Automatic",
            fuelType: "Hybrid",
            consumption: "5.0 L/100km",
            numDoors: 5,
            numMaxPeople: 5,
            description: "Spacious and eco-friendly SUV.",
            picture: "",
            rentStatus: "available",
          },
          {
            brand: "Ford",
            model: "Escape",
            price: 120,
            vehicleType: "SUV",
            gearShift: "Automatic",
            fuelType: "Hybrid",
            consumption: "5.0 L/100km",
            numDoors: 5,
            numMaxPeople: 5,
            description: "Spacious and eco-friendly SUV.",
            picture: "",
            rentStatus: "available",
          },
          {
            brand: "Ford",
            model: "Escape",
            price: 120,
            vehicleType: "SUV",
            gearShift: "Automatic",
            fuelType: "Hybrid",
            consumption: "5.0 L/100km",
            numDoors: 5,
            numMaxPeople: 5,
            description: "Spacious and eco-friendly SUV.",
            picture: "",
            rentStatus: "available",
          },
        ],
        workingTime: 12,
        openStatus: "closed",
        location: "Location 3",
        logo: "",
        rating: 4.8,
      },
    };
  },
  components: {
    Vehicle,
  },
};
</script>

<style scoped></style>
