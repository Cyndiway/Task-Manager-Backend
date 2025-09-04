import { taskReminder } from "../../cron/taskReminder.js";
import overDueTask from "../../cron/overDueTask.js";

export const sendTaskReminder = async () => {
  try {
    await taskReminder();
    res.status(200).send("Task reminders sent.");
  } catch (error) {
    console.error("Error sending task reminders:", error);
  }
};

export const sendOverDuePendingTasks = async () => {
  try {
    await overDueTask();
    res.status(200).send("Overdue pending task reminders sent.");
  } catch (error) {
    console.error("Error sending overdue pending task reminders:", error);
  }
};
