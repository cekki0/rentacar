import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Facilities from "../components/Facilities.vue";
import FacilityDetails from "@/components/FacilityDetails.vue";
import Profile from "@/components/Profile.vue";
import EditProfile from "@/components/EditProfile.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import RegistrationManager from "../components/RegistrationManager.vue";
import CreateFacility from "../components/CreateFacility";
import ManageVehicles from "../components/ManageVehicles";
import EditVehicle from "../components/EditVehicle";

const routes = [
  { path: "/", component: Facilities },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/facility/:id",
    name: "FacilityDetails",
    component: FacilityDetails,
  },
  { path: "/profile", component: Profile },
  { path: "/profile/edit", component: EditProfile },
  { path: "/profile/changePassword", component: ChangePassword },
  { path: "/registerManager", component: RegistrationManager },
  { path: "/createFacility", component: CreateFacility },
  { path: "/manageVehicles", component: ManageVehicles },
  { path: "/manageVehicles/edit/:id", component: EditVehicle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
