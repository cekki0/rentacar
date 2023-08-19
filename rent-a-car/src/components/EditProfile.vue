<template>
  <div class="container">
    <h2>Edit Profile</h2>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="saveProfile">
          <div class="mb-3">
            <label for="FirstName" class="form-label">First Name</label>
            <input
              type="text"
              class="form-control"
              id="FirstName"
              v-model="editedUser.firstName"
            />
            <div class="text-danger" v-if="!editedUser.firstName.trim()">
              First Name is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="LastName" class="form-label">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="LastName"
              v-model="editedUser.lastName"
            />
            <div class="text-danger" v-if="!editedUser.lastName.trim()">
              Last Name is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="Gender" class="form-label">Gender</label>
            <select
              class="form-control"
              id="Gender"
              v-model="editedUser.gender"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div class="text-danger" v-if="!editedUser.gender.trim()">
              Gender is required.
            </div>
          </div>
          <div class="mb-3">
            <label for="DateOfBirth" class="form-label">Date of Birth</label>
            <input
              type="date"
              class="form-control"
              id="DateOfBirth"
              v-model="editedUser.dateOfBirth"
            />
            <div class="text-danger" v-if="!editedUser.dateOfBirth">
              Date of Birth is required.
            </div>
            <div
              class="text-danger"
              v-else-if="!isOver18(editedUser.dateOfBirth)"
            >
              Date of Birth must be over 18 years old.
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedUser: {
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
      },
    };
  },
  methods: {
    async saveProfile() {
      if (
        this.editedUser.firstName.trim() &&
        this.editedUser.lastName.trim() &&
        this.editedUser.gender.trim() &&
        this.editedUser.dateOfBirth &&
        this.isOver18(this.editedUser.dateOfBirth)
      ) {
        try {
          const response = await this.axios.patch(
            `http://localhost:3000/user/profile/edit`,
            this.editedUser
          );
          if (response.status === 200) {
            this.$router.push(`/profile/`);
          } else {
          }
        } catch (error) {}
      }
    },
    isOver18(dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
      const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
      return yearsDiff > 18 || (yearsDiff === 18 && monthsDiff >= 0);
    },
  },
};
</script>
