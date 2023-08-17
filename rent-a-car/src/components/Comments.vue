<template>
  <div class="container mt-4">
    <h2 class="mb-4">Comments</h2>
    <ul class="list-group">
      <li v-for="comment in comments" :key="comment.id" class="list-group-item">
        {{ comment.comment }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/comment/comments"
        );
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>
