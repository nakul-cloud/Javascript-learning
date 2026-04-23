
// 1. CLASSES


class Todo {
  constructor(title, desc, date, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}


// 2. APP STATE


let projects = [];
let currentProjectIndex = 0;


// 3. STORAGE


function save() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function load() {
  const data = JSON.parse(localStorage.getItem("projects"));

  if (!data) {
    const defaultProject = new Project("Default");
    projects.push(defaultProject);
    return;
  }

  // recreate objects
  projects = data.map(p => {
    const proj = new Project(p.name);

    p.todos.forEach(t => {
      const todo = new Todo(t.title, t.desc, t.date, t.priority);
      todo.completed = t.completed;
      proj.addTodo(todo);
    });

    return proj;
  });
}

// 4. UI RENDER


function renderProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = p.name;

    li.addEventListener("click", () => {
      currentProjectIndex = index;
      renderTodos();
    });

    list.appendChild(li);
  });
}

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  const project = projects[currentProjectIndex];

  project.todos.forEach(todo => {
    const li = document.createElement("li");

    li.className = todo.priority.toLowerCase();

    li.innerHTML = `
      <strong>${todo.title}</strong> (${todo.date})
      <button onclick="deleteTodo('${todo.id}')">❌</button>
      <button onclick="toggleTodo('${todo.id}')">✔</button>
    `;

    list.appendChild(li);
  });
}
 
// 5. LOGIC FUNCTIONS
 

function addProject() {
  const name = document.getElementById("projectInput").value;

  if (!name) return;

  projects.push(new Project(name));
  save();
  renderProjects();
}

function addTodo() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value;

  const todo = new Todo(title, desc, date, priority);

  projects[currentProjectIndex].addTodo(todo);

  save();
  renderTodos();
}

function deleteTodo(id) {
  projects[currentProjectIndex].deleteTodo(id);
  save();
  renderTodos();
}

function toggleTodo(id) {
  const project = projects[currentProjectIndex];

  project.todos.forEach(t => {
    if (t.id === id) t.toggle();
  });

  save();
  renderTodos();
}


// 6. EVENTS


document.getElementById("addProjectBtn").addEventListener("click", addProject);
document.getElementById("addTodoBtn").addEventListener("click", addTodo);

// ================================
// 7. INIT
// ================================

load();
renderProjects();
renderTodos();