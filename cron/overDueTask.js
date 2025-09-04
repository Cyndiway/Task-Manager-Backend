import cron from "node-cron";
import Task from "../models/taskModel.js";
import sendMail from "../utils/emailSender.js";
import { groupTasksByUser, buildTaskEmail } from "../cron/groupUserTask.js";

// Run every minute 9:30am daily
const overdueTask = cron.schedule("30 9 * * *", async () => {
  console.log("⏰ Running daily reminder cron...");
  const now = new Date();
  try {
    //Fetch tasks that are overdue with user populated
    const tasks = await Task.find({
      completed: false,
      deadline: { $lt: now },
    }).populate({
      path: "user",
      select: "email name userName emailReminders",
      match: {
        $or: [
          { emailReminders: { $ne: false } }, // true or undefined
          { emailReminders: { $exists: false } },
        ],
      },
    });

    if (!tasks.length) {
      console.log(" No upcoming tasks found for reminders.");
      return;
    }

    // Group tasks by user
    const grouped = groupTasksByUser(tasks);

    //Send reminder email for each user
    for (const userId of Object.keys(grouped)) {
      const { email, name, tasks } = grouped[userId];

      const html = buildTaskEmail(
        name,
        tasks,
        "Overdue Task Reminders",
        "Here are your tasks that are overdue:"
      );

      await sendMail({
        to: email,
        subject: " Task Reminder - Overdue Deadlines",
        html,
      });

      console.log(` Reminder sent to ${email}`);
    }
  } catch (err) {
    console.error(" Error running reminder cron:", err);
  }
});

export default overdueTask;
