<template>
  <div class="container">
    <h2>Facilities</h2>
    <div class="row">
      <!-- Search Options -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Search by Facility Name</label>
        <input type="text" class="form-control" v-model="searchFacilityName" />
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Search by Vehicle Type</label>
        <input type="text" class="form-control" v-model="searchVehicleType" />
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Search by Location</label>
        <input type="text" class="form-control" v-model="searchLocation" />
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Search by Rating</label>
        <input type="number" class="form-control" v-model="searchRating" />
      </div>
      <!-- Sort and Filter Options -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Sort by</label>
        <select class="form-select" v-model="sortOption">
          <option value="nameAsc">Name (A to Z)</option>
          <option value="nameDesc">Name (Z to A)</option>
          <option value="locationAsc">Location (A to Z)</option>
          <option value="locationDesc">Location (Z to A)</option>
          <option value="ratingAsc">Rating (Low to High)</option>
          <option value="ratingDesc">Rating (High to Low)</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Filter by Vehicle Type</label>
        <select class="form-select" v-model="filterVehicleType">
          <option value="">All Types</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Filter by Fuel Type</label>
        <select class="form-select" v-model="filterFuelType">
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
          <option value="hybrid">Hybrid</option>
          <option value="gas">Gas</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label">Filter by Facility Status</label>
        <select class="form-select" v-model="filterOpenedFacilities">
          <option value="Opened">Opened</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
    <!-- Facility Listings -->
    <div class="row">
      <div v-for="facility in filteredFacilities" class="col-md-3 mb-3">
        <Facility
          :facility="facility"
          @click="onClick(facility.id)"
          style="cursor: pointer"
        />
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
      filterFuelType: "diesel",
      filterOpenedFacilities: "",
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
    onClick(id) {
      this.$router.push(`/facility/${id}`);
    },
  },
  async mounted() {
    await this.fetchFacilities();
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
          const fuelTypeMatches = facility.vehicles.some((vehicle) => {
            const vehicleFuelType = vehicle.fuelType.toLowerCase();
            const filterFuelType = this.filterFuelType.toLowerCase();

            return vehicleFuelType === filterFuelType;
          });

          const openedFacilitiesMatch =
            this.filterOpenedFacilities === "" ||
            (this.filterOpenedFacilities === "Opened" &&
              facility.openStatus === "Opened") ||
            (this.filterOpenedFacilities === "Closed" &&
              facility.openStatus === "Closed");

          return vehicleTypeMatches && fuelTypeMatches && openedFacilitiesMatch;
        });
    },
  },
};
</script>
