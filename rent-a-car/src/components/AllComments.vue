<template>
  <div class="container">
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-content"><Comment :comment="comment"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue"
export default {
  data() {
    return {
      comments: "",
    };
  },
  methods: {
    async fetchComments() {
      try {
        const res = await this.axios.get(
          "http://localhost:3000/comment/allCommentsAdmin"
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
  components:{
    Comment
  }
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
