import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers/barrel.js";
import { protect } from "../middleware/authMiddleware.js";

const taskRoutes = express.Router();

taskRoutes
  .post("/", protect, createTask)

  //get all and get by id
  .get("/", protect, getTasks)
  .get("/:id", protect, getTaskById)

  //update and delete by id
  .put("/:id", protect, updateTask)
  .delete("/:id", protect, deleteTask);

export default taskRoutes;
