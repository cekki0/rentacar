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
        <img :src="vehicle.picture" alt="Vehicle Picture">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      vehicle: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  