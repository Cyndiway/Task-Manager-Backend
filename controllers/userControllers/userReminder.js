import { tr } from "zod/locales";
import User from "../../models/userModel.js";

export const updateReminderSetting = async (req, res) => {
  const { id, type } = req.body; // type can be true, false, or undefined (to toggle)
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (type === true) {
      user.emailReminders = true;
    } else if (type === false) {
      user.emailReminders = false;
    } else {
      // If type is not provided, toggle the current setting
      user.emailReminders = !user.emailReminders;
    }

    await user.save();
    res.json({
      message: "Email reminder setting updated",
      emailReminders: user.emailReminders,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
