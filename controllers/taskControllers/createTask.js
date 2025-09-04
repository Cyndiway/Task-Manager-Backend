import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";

// create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, category, deadline } = req.body;
    const user = req.userId;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      category,
      deadline,
      user,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid task data" });
  }
};
