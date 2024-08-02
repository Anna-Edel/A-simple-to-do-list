document.addEventListener('DOMContentLoaded', () => {
    const tasksForm = document.getElementById('tasks__form');
    const taskInput = document.getElementById('task__input');
    const tasksList = document.getElementById('tasks__list');

    // Загрузка задач из localStorage
    loadTasks();

    tasksForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const task = document.createElement('div');
        task.className = 'task';

        const taskTitle = document.createElement('div');
        taskTitle.className = 'task__title';
        taskTitle.textContent = text;

        const taskRemove = document.createElement('a');
        taskRemove.href = '#';
        taskRemove.className = 'task__remove';
        taskRemove.innerHTML = '&times;';

        taskRemove.addEventListener('click', (event) => {
            event.preventDefault();
            tasksList.removeChild(task);
            saveTasks();
        });

        task.appendChild(taskTitle);
        task.appendChild(taskRemove);

        tasksList.appendChild(task);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task__title').forEach(taskTitle => {
            tasks.push(taskTitle.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            addTask(taskText);
        });
    }
});
