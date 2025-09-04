import Task from "../../models/taskModel.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Get single task by ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// export const getTaskById = async (req, res) => {
//   const taskId = req.params;
//   try {
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     } else if (task && task.user.toString() === req.userId.toString()) {
//       res.json(task);
//     } else {
//       res.status(404).json({ message: "Task not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching task" });
//   }
// };
