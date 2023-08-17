<template>
  <footer class="footer bg-light">
    <div class="container text-center">&copy; {{ currentYear }} Rent A Car</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
