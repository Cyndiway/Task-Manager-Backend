import Task from "../../models/taskModel.js";

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, deadline } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task && task.user.toString() === req.userId.toString()) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.category = req.body.category || task.category;
      task.deadline = req.body.deadline || task.deadline;
      task.completed = req.body.completed ?? task.completed;

      const updatedTask = await task.save();
      res.json(updatedTask, { message: "Task updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found or not authorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
};
