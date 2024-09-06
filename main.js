// Load tasks from local storage when the page loads
window.onload = loadTasks;

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => createTaskElement(task));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('new-task');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  saveTasksToLocalStorage(tasks);

  createTaskElement(taskText);

  taskInput.value = '';
}

// Function to create a task element and append it to the list
function createTaskElement(taskText) {
  const taskList = document.getElementById('task-list');

  const li = document.createElement('li');
  li.textContent = taskText;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-btn');
  editButton.onclick = () => editTask(taskText, li);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = () => deleteTask(taskText, li);

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  taskList.appendChild(li);
}

// Function to delete a task
function deleteTask(taskText, taskElement) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskText);
  saveTasksToLocalStorage(tasks);

  taskElement.remove();
}

// Function to edit a task
function editTask(taskText, taskElement) {
  const newTaskText = prompt('Edit task:', taskText);

  if (newTaskText === null || newTaskText.trim() === '') {
    return;
  }

  let tasks = getTasksFromLocalStorage();
  tasks = tasks.map(task => task === taskText ? newTaskText.trim() : task);
  saveTasksToLocalStorage(tasks);

  taskElement.firstChild.textContent = newTaskText.trim();
}

// Function to search for tasks
function searchTasks() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const tasks = document.querySelectorAll('#task-list li');

  tasks.forEach(task => {
    const taskText = task.firstChild.textContent.toLowerCase();
    task.style.display = taskText.includes(searchInput) ? '' : 'none';
  });
}
