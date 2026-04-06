const STORAGE_KEY = "daily-task-manager-items";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const taskProgress = document.getElementById("task-progress");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const taskTemplate = document.getElementById("task-item-template");

let currentFilter = "all";
let tasks = loadTasks();

render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  input.value = "";
  persistTasks();
  render();
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  persistTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  const filteredTasks = getFilteredTasks();
  taskList.innerHTML = "";

  if (!filteredTasks.length) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = emptyMessage();
    taskList.appendChild(emptyState);
  } else {
    filteredTasks.forEach((task) => {
      const taskNode = taskTemplate.content.firstElementChild.cloneNode(true);
      const checkbox = taskNode.querySelector(".task-toggle");
      const text = taskNode.querySelector(".task-text");
      const deleteButton = taskNode.querySelector(".delete-btn");

      taskNode.classList.toggle("completed", task.completed);
      checkbox.checked = task.completed;
      text.textContent = task.text;

      checkbox.addEventListener("change", () => toggleTask(task.id));
      deleteButton.addEventListener("click", () => deleteTask(task.id));

      taskList.appendChild(taskNode);
    });
  }

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  taskCount.textContent = `${activeCount} task${activeCount === 1 ? "" : "s"} left`;
  taskProgress.textContent = tasks.length
    ? `${completedCount} of ${tasks.length} completed`
    : "No tasks yet";
  clearCompletedButton.disabled = completedCount === 0;
  clearCompletedButton.style.opacity = completedCount === 0 ? "0.5" : "1";
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function emptyMessage() {
  if (currentFilter === "active") {
    return "No active tasks right now.";
  }

  if (currentFilter === "completed") {
    return "No completed tasks yet.";
  }

  return "Start your day by adding your first task.";
}

function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  persistTasks();
  render();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  persistTasks();
  render();
}
