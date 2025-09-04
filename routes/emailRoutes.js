import { Router } from "express";
import {
  sendTaskReminder,
  sendOverDuePendingTasks,
} from "../controllers/emailControllers/sendreminder.js";

const emailRoutes = Router();

emailRoutes
  .get("/overdue", sendTaskReminder)
  .get("/overdue/pending", sendOverDuePendingTasks);

export default emailRoutes;
