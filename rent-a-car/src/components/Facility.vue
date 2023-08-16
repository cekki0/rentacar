<template>
  <div class="card">
    <img :src="logo" class="card-img-top" alt="Facility Logo">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ location }}</p>
      <p class="card-text">Rating: {{ rating }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logo: String,
    name: String,
    location: String,
    rating: String,
  }
}
</script>