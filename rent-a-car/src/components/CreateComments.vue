<template>
  <div class="container mt-4">
    <h2>Add Comment</h2>
    <form @submit.prevent="addComment">
      <div class="mb-3">
        <label for="comment" class="form-label">Comment:</label>
        <textarea
          class="form-control"
          id="comment"
          v-model="newComment"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add comment</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      newComment: "",
    };
  },
  methods: {
    async addComment() {
      try {
        await this.axios.post("http://localhost:3000/comment/create", {
          comment: this.newComment,
          facilityId: this.$route.params.id,
        });
        router.push("/");
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    },
  },
};
</script>
