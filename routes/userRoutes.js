import router from "express";
import {
  register,
  getAllUsers,
  getAUserProfile,
  getAUserByParam,
  updateUserProfile,
  deleteUser,
  updateReminderSetting,
} from "../controllers/userControllers/barrel.js";

const userRoutes = router();

userRoutes
  .post("/create", register)

  // Get Users
  .get("/", getAllUsers)
  .get("/:id", getAUserProfile)
  .get("/param/:param", getAUserByParam)

  // Update User Profile
  .put("/:id", updateUserProfile)
  .patch("/reminder", updateReminderSetting)

  // Delete user profile
  .delete("/:id", deleteUser);

export default userRoutes;
