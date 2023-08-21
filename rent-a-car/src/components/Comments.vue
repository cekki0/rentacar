<template>
  <div class="container mt-4">
    <h2 class="mb-4">Comments</h2>
    <ul class="list-group">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      ></Comment>
    </ul>
  </div>
</template>

<script>
import Comment from './Comment.vue';

export default {
  props: ["kurcina"],
  components: {
    Comment
  },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/comment/comments",
          {
            facilityId: this.kurcina,
          }
        );
        this.comments = response.data.filter(
          (comment) => comment.status == "Approved"
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
  watch: {
    kurcina(value, oldvalue) {
      this.fetchComments();
    },
  },
};
</script>
