<template>
  <div class="container">
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-content">{{ comment.comment }}</div>
        <div class="comment-actions" v-if="comment.status == 'pending'">
          <button @click="approveComment(comment.id)" class="btn btn-success">
            Approve
          </button>
          <button @click="denyComment(comment.id)" class="btn btn-danger">
            Deny
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolveDirective } from "vue";

export default {
  data() {
    return {
      comments: "",
    };
  },
  methods: {
    async approveComment(commentId) {
      try {
        const res = await this.axios.patch(
          `http://localhost:3000/comment/approveComment/${commentId}`
        );
        this.fetchComments();
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    },

    async denyComment(commentId) {
      try {
        const res = await this.axios.patch(
          `http://localhost:3000/comment/denyComment/${commentId}`
        );
        this.comments = res.data;

        this.fetchComments();
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    },

    async fetchComments() {
      try {
        const res = await this.axios.get(
          "http://localhost:3000/comment/allComments"
        );
        this.comments = res.data;
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.comment {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
</style>
