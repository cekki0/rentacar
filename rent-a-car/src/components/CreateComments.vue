<template>
  <div class="container mt-4">
    <h2>Unos komentara</h2>
    <form @submit.prevent="addComment">
      <div class="mb-3">
        <label for="comment" class="form-label">Komentar:</label>
        <textarea
          class="form-control"
          id="comment"
          v-model="newComment"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Dodaj komentar</button>
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
        await this.axios.post("http://localhost:3000/comment/createComments", {
          comment: this.newComment,
        });
        router.push("/");
      } catch (error) {
        alert("Error za dodavanja komentara.");
        console.error(error);
      }
    },
  },
};
</script>
