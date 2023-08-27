<template>
  <div class="list-group-item">
    <div><strong>User:</strong> {{ this.user.username }}</div>
    <div>Facility: {{ this.facility.name }}</div>
    <div>Comment: {{ comment.comment }}</div>
    <div>Rating: {{ comment.rating }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      facility: {},
    };
  },
  props: {
    comment: Object,
  },
  methods: {
    async fetchFacility() {
      try {
        const res = await this.axios.get(
          `http://localhost:3000/facility/facility/${this.comment.facilityId}`
        );
        this.facility = res.data;
      } catch (error) {
        console.error("Error fetching facility:", error);
      }
    },
    async fetchUser() {
      try {
        const res = await this.axios.get(
          `http://localhost:3000/user/user/${this.comment.userId}`
        );
        this.user = res.data;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  },
  async mounted() {
    await this.fetchFacility();
    await this.fetchUser();
  },
};
</script>
