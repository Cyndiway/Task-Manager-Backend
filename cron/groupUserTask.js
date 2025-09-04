// Group tasks by user (no DB fetch needed)
export function groupTasksByUser(tasks) {
  const grouped = {};

  for (const task of tasks) {
    const user = task.user;
    if (!user) continue;

    const userId = user._id.toString();

    if (!grouped[userId]) {
      grouped[userId] = {
        email: user.email,
        name: user.name || user.userName || "there",
        tasks: [],
      };
    }
    grouped[userId].tasks.push(task);
  }

  return grouped;
}

// Build email HTML content
export function buildTaskEmail(name, tasks, title, intro) {
  const taskList = tasks
    .map(
      (t) =>
        `- ${t.title} (Due: ${t.deadline})${
          t.status ? ` (Status: ${t.status})` : ""
        }`
    )
    .join("\n");

  return `
    <h3>${title}</h3>
    <p>Hi ${name},</p>
    <p>${intro}</p>
    <pre>${taskList}</pre>
  `;
}
