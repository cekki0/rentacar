<template>
    <div class="container">
      <h2>Change Password</h2>
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="changePassword">
            <div class="mb-3">
              <label for="OldPassword" class="form-label">Old Password</label>
              <input
                type="password"
                class="form-control"
                id="OldPassword"
                v-model="oldPassword"
                :class="{ 'is-invalid': oldPasswordError }"
              />
              <div class="invalid-feedback" v-if="oldPasswordError">
                Old password is required.
              </div>
            </div>
            <div class="mb-3">
              <label for="NewPassword" class="form-label">New Password</label>
              <input
                type="password"
                class="form-control"
                id="NewPassword"
                v-model="newPassword"
                :class="{ 'is-invalid': newPasswordError }"
              />
              <div class="invalid-feedback" v-if="newPasswordError">
                New password is required and must be at least 6 characters long.
              </div>
            </div>
            <div class="mb-3">
              <label for="ConfirmNewPassword" class="form-label">Confirm New Password</label>
              <input
                type="password"
                class="form-control"
                id="ConfirmNewPassword"
                v-model="confirmNewPassword"
                :class="{ 'is-invalid': confirmNewPasswordError }"
              />
              <div class="invalid-feedback" v-if="confirmNewPasswordError">
                Password confirmation does not match.
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  export default {
    data() {
      return {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        oldPasswordError: false,
        newPasswordError: false,
        confirmNewPasswordError: false,
      };
    },
    methods: {
      validateForm() {
        let valid = true;
  
        if (!this.oldPassword) {
          this.oldPasswordError = true;
          valid = false;
        } else {
          this.oldPasswordError = false;
        }
  
        if (!this.newPassword || this.newPassword.length < 6) {
          this.newPasswordError = true;
          valid = false;
        } else {
          this.newPasswordError = false;
        }
  
        if (this.newPassword !== this.confirmNewPassword) {
          this.confirmNewPasswordError = true;
          valid = false;
        } else {
          this.confirmNewPasswordError = false;
        }
  
        return valid;
      },
      changePassword() {
        if (this.validateForm()) {
          router.push('/login')
        }
      },
    },
  };
  </script>
  