<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
      <p class="card-text">
        Username: {{ user.username }}<br />
        First name: {{ user.firstName }}<br />
        Last name: {{ user.lastName }}<br />
        Gender: {{ user.gender }}<br />
        Date of Birth: {{ user.dateOfBirth }}<br />
        Role: {{ user.role }}<br />
        Points: {{ user.points }}<br />
        User Type: {{ user.userType }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
