import cron from "node-cron";
import Task from "../models/taskModel.js";
import sendMail from "../utils/emailSender.js";
import { groupTasksByUser, buildTaskEmail } from "../cron/groupUserTask.js";

// Run every minute 9am daily
export const taskReminder = cron.schedule("0 9 * * *", async () => {
  console.log("⏰ Running daily reminder cron...");

  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  try {
    //Fetch tasks due in the next 24h with user populated
    const tasks = await Task.find({
      completed: false,
      deadline: { $gte: now, $lte: next24h },
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
        "Upcoming Task Reminders",
        "Here are your tasks due within the next 24 hours:"
      );

      await sendMail({
        to: email,
        subject: " Task Reminder - Upcoming Deadlines",
        html,
      });

      console.log(` Reminder sent to ${email}`);
    }
  } catch (err) {
    console.error(" Error running reminder cron:", err);
  }
});
