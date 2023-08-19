<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="Username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="Username"
          v-model="username"
          :class="{ 'is-invalid': usernameError }"
        />
        <div class="invalid-feedback" v-if="usernameError">
          Please provide a valid username.
        </div>
      </div>
      <div class="mb-3">
        <label for="Password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="Password"
          v-model="password"
          :class="{ 'is-invalid': passwordError }"
        />
        <div class="invalid-feedback" v-if="passwordError">
          Password must be at least 6 characters.
        </div>
      </div>
      <div class="mb-3">
        <label for="ConfirmPassword" class="form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="ConfirmPassword"
          v-model="confirmPassword"
          :class="{ 'is-invalid': confirmPasswordError }"
        />
        <div class="invalid-feedback" v-if="confirmPasswordError">
          Passwords do not match.
        </div>
      </div>
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="firstName"
          :class="{ 'is-invalid': firstNameError }"
        />
        <div class="invalid-feedback" v-if="firstNameError">
          Please provide a valid first name.
        </div>
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="lastName"
          :class="{ 'is-invalid': lastNameError }"
        />
        <div class="invalid-feedback" v-if="lastNameError">
          Please provide a valid last name.
        </div>
      </div>
      <div class="mb-3">
        <label for="dateOfBirth" class="form-label">Date of Birth</label>
        <input
          type="date"
          class="form-control"
          id="dateOfBirth"
          v-model="dateOfBirth"
          :class="{ 'is-invalid': dateOfBirthError }"
        />
        <div class="invalid-feedback" v-if="dateOfBirthError || ageError">
          {{
            dateOfBirthError
              ? "Please provide a valid date of birth."
              : "You must be over 18 years old to register."
          }}
        </div>
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="maleButton"
            value="male"
            v-model="gender"
            :class="{ 'is-invalid': genderError }"
          />
          <label class="form-check-label" for="maleButton"> Male </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="femaleButton"
            value="female"
            v-model="gender"
            :class="{ 'is-invalid': genderError }"
          />
          <label class="form-check-label" for="femaleButton"> Female </label>
        </div>
        <div class="invalid-feedback" v-if="genderError">
          Please select a gender.
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      usernameError: false,
      passwordError: false,
      confirmPasswordError: false,
      firstNameError: false,
      lastNameError: false,
      dateOfBirthError: false,
      genderError: false,
      ageError: false,
    };
  },
  methods: {
    validateForm() {
      let valid = true;

      if (!this.username) {
        this.usernameError = true;
        valid = false;
      } else {
        this.usernameError = false;
      }

      if (this.password.length < 6) {
        this.passwordError = true;
        valid = false;
      } else {
        this.passwordError = false;
      }

      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = true;
        valid = false;
      } else {
        this.confirmPasswordError = false;
      }

      if (!this.firstName) {
        this.firstNameError = true;
        valid = false;
      } else {
        this.firstNameError = false;
      }

      if (!this.lastName) {
        this.lastNameError = true;
        valid = false;
      } else {
        this.lastNameError = false;
      }

      if (!this.dateOfBirth) {
        this.dateOfBirthError = true;
        valid = false;
      } else {
        this.dateOfBirthError = false;
        const currentDate = new Date();
        const birthDate = new Date(this.dateOfBirth);
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        if (age < 18) {
          this.ageError = true;
          valid = false;
        } else {
          this.ageError = false;
        }
      }

      if (!this.gender) {
        this.genderError = true;
        valid = false;
      } else {
        this.genderError = false;
      }

      return valid;
    },
    async register() {
      if (this.validateForm()) {
        try {
          const res = await this.axios.post(
            "http://localhost:3000/user/register",
            {
              username: this.username,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              dateOfBirth: this.dateOfBirth,
              gender: this.gender,
            }
          );
          router.push("/login");
        } catch (error) {
          alert("invalid input");
          console.log(error);
        }
      }
    },
  },
};
</script>
