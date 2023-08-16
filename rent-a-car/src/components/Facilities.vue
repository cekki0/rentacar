<template>
  <!-- Search -->
  <div class="container">
    <div class="mb-3">
      <label for="searchFacilityName" class="form-label"
        >Search by Facility Name</label
      >
      <input
        type="text"
        class="form-control"
        id="searchFacilityName"
        v-model="searchFacilityName"
      />
    </div>
    <div class="mb-3">
      <label for="searchVehicleType" class="form-label"
        >Search by Vehicle Type</label
      >
      <input
        type="text"
        class="form-control"
        id="searchVehicleType"
        v-model="searchVehicleType"
      />
    </div>
    <div class="mb-3">
      <label for="searchLocation" class="form-label">Search by Location</label>
      <input
        type="text"
        class="form-control"
        id="searchLocation"
        v-model="searchLocation"
      />
    </div>
    <div class="mb-3">
      <label for="searchRating" class="form-label">Search by Rating</label>
      <input
        type="number"
        class="form-control"
        id="searchRating"
        v-model="searchRating"
      />
    </div>
    <!-- Sort -->
    <div class="mb-3">
      <label for="sortSelect" class="form-label">Sort by</label>
      <select class="form-select" id="sortSelect" v-model="sortOption">
        <option value="nameAsc">Name (A to Z)</option>
        <option value="nameDesc">Name (Z to A)</option>
        <option value="locationAsc">Location (A to Z)</option>
        <option value="locationDesc">Location (Z to A)</option>
        <option value="ratingAsc">Rating (Low to High)</option>
        <option value="ratingDesc">Rating (High to Low)</option>
      </select>
    </div>
    <!-- Filter -->
    <div class="mb-3">
      <label for="filterVehicleType" class="form-label"
        >Filter by Vehicle Type</label
      >
      <input
        type="text"
        class="form-control"
        id="filterVehicleType"
        v-model="filterVehicleType"
      />
    </div>
    <div class="mb-3">
      <label for="filterFuelType" class="form-label">Filter by Fuel Type</label>
      <input
        type="text"
        class="form-control"
        id="filterFuelType"
        v-model="filterFuelType"
      />
    </div>
    <div class="mb-3">
      <label for="filterOpenedFacilities" class="form-label"
        >Filter by Opened Facilities</label
      >
      <input
        type="checkbox"
        class="form-check-input"
        id="filterOpenedFacilities"
        v-model="filterOpenedFacilities"
      />
    </div>
    <div class="col">
      <div v-for="(facility, index) in filteredFacilities" :key="index">
        <router-link :to="{ name: 'FacilityDetails', params: { id: index } }">
          <Facility
            :logo="facility.logo"
            :name="facility.name"
            :location="facility.location"
            :rating="facility.rating"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Facility from "./Facility.vue";

export default {
  data() {
    return {
      facilities: [],
      searchFacilityName: "",
      searchVehicleType: "",
      searchLocation: "",
      searchRating: null,
      sortOption: "",
      filterVehicleType: "",
      filterFuelType: "",
      filterOpenedFacilities: false,
    };
  },
  components: {
    Facility,
  },
  methods: {
    async fetchFacilities() {
      try {
        const res = await this.axios.get(
          `http://localhost:3000/facility/facilities`
        );
        this.facilities = res.data;
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    },
  },
  mounted() {
    this.fetchFacilities();
  },
  computed: {
    filteredFacilities() {
      return this.facilities
        .filter((facility) => {
          const nameMatches = facility.name
            .toLowerCase()
            .includes(this.searchFacilityName.toLowerCase());
          const vehicleTypeMatches = facility.vehicles.some((vehicle) =>
            vehicle.vehicleType
              .toLowerCase()
              .includes(this.searchVehicleType.toLowerCase())
          );
          const locationMatches = facility.location
            .toLowerCase()
            .includes(this.searchLocation.toLowerCase());
          const ratingMatches =
            this.searchRating === null ||
            facility.rating >= parseFloat(this.searchRating);

          return (
            nameMatches &&
            vehicleTypeMatches &&
            locationMatches &&
            ratingMatches
          );
        })
        .sort((a, b) => {
          if (this.sortOption === "nameAsc") {
            return a.name.localeCompare(b.name);
          } else if (this.sortOption === "nameDesc") {
            return b.name.localeCompare(a.name);
          } else if (this.sortOption === "locationAsc") {
            return a.location.localeCompare(b.location);
          } else if (this.sortOption === "locationDesc") {
            return b.location.localeCompare(a.location);
          } else if (this.sortOption === "ratingAsc") {
            return a.rating - b.rating;
          } else if (this.sortOption === "ratingDesc") {
            return b.rating - a.rating;
          } else {
            return 0;
          }
        })
        .filter((facility) => {
          const vehicleTypeMatches = facility.vehicles.some((vehicle) =>
            vehicle.vehicleType
              .toLowerCase()
              .includes(this.filterVehicleType.toLowerCase())
          );
          const fuelTypeMatches = facility.vehicles.some((vehicle) =>
            vehicle.fuelType
              .toLowerCase()
              .includes(this.filterFuelType.toLowerCase())
          );
          const openedFacilitiesMatch =
            !this.filterOpenedFacilities || facility.openStatus === "opened";

          return vehicleTypeMatches && fuelTypeMatches && openedFacilitiesMatch;
        });
    },
  },
};
</script>
