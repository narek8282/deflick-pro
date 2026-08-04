const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const loginForm = document.querySelector("#login-form");
const loginError = document.querySelector("#login-error");
const heroInput = document.querySelector("#hero-input");
const contactInput = document.querySelector("#contact-input");
const saveCopy = document.querySelector("#save-copy");
const previewHero = document.querySelector("#preview-hero");
const previewContact = document.querySelector("#preview-contact");
const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");
const exportJson = document.querySelector("#export-json");
const resetData = document.querySelector("#reset-data");

const storageKey = "deflick-admin-v1";
const defaultState = {
  hero: "Films that feel like a signal before they become a release.",
  contact:
    "Selected production, launch, and sponsor-system work. Built from Armenia for global campaigns, brands, films, and cultural objects.",
  tasks: [
    { title: "Replace www DNS CNAME with narek8282.github.io", done: false },
    { title: "Shoot three hero film frames for Deflick", done: false },
    { title: "Prepare 6 case-study thumbnails", done: false },
    { title: "Write first sponsor outreach sequence", done: true },
  ],
};

let state = loadState();

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state, null, 2));
}

function render() {
  heroInput.value = state.hero;
  contactInput.value = state.contact;
  previewHero.textContent = state.hero;
  previewContact.textContent = state.contact;
  taskList.innerHTML = "";

  state.tasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.className = `task-item${task.done ? " is-done" : ""}`;

    const title = document.createElement("span");
    title.textContent = task.title;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = task.done ? "Done" : "Mark";
    button.addEventListener("click", () => {
      state.tasks[index].done = !state.tasks[index].done;
      saveState();
      render();
    });

    item.append(title, button);
    taskList.append(item);
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const login = String(data.get("login") || "").trim();
  const password = String(data.get("password") || "").trim();

  if (login === "admin" && password === "admin") {
    loginPanel.classList.add("is-hidden");
    dashboard.classList.remove("is-hidden");
    loginError.textContent = "";
    render();
    return;
  }

  loginError.textContent = "Wrong login or password.";
});

saveCopy.addEventListener("click", () => {
  state.hero = heroInput.value.trim() || defaultState.hero;
  state.contact = contactInput.value.trim() || defaultState.contact;
  saveState();
  render();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(taskForm);
  const title = String(data.get("task") || "").trim();
  if (!title) return;
  state.tasks.unshift({ title, done: false });
  taskForm.reset();
  saveState();
  render();
});

exportJson.addEventListener("click", () => {
  const file = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "deflick-admin-export.json";
  link.click();
  URL.revokeObjectURL(url);
});

resetData.addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveState();
  render();
});
