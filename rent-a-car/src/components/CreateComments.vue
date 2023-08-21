<template>
  <div class="container mt-4">
    <h2>Add Comment and Rating</h2>
    <form @submit.prevent="addComment">
      <div class="mb-3">
        <label for="rating" class="form-label">Rating:</label>
        <select class="form-select" id="rating" v-model="selectedRating" required>
          <option v-for="rating in ratings" :key="rating">{{ rating }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="comment" class="form-label">Comment:</label>
        <textarea
          class="form-control"
          id="comment"
          v-model="newComment"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Comment</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      newComment: "",
      selectedRating: 10, 
      ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      user:{},
      comment:{}
    };
  },
  methods: {
    async addComment() {
      try {
        await this.axios.post("http://localhost:3000/comment/create", {
          comment: this.newComment,
          rating: this.selectedRating,
          facilityId: this.$route.params.id,
          userId: this.user.id
        });
        this.$router.push(`/facility/${this.$route.params.id}`);
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.axios
      .get(`http://localhost:3000/user/profile/`)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  },
};
</script>
