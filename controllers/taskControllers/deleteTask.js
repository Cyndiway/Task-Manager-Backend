import Task from "../../models/taskModel.js";

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    } else if (task.user.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    } else {
      await task.deleteOne();
      res.json({ message: "Task removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

// export const deleteTask = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const task = await Task.findById(id);
//     if (task && task.user.toString() === req.userId.toString()) {
//       await task.remove();
//       res.json({ message: "Task removed" });
//     } else {
//       res.status(404).json({ message: "Task not found or not authorized" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting task" });
//   }
// };
