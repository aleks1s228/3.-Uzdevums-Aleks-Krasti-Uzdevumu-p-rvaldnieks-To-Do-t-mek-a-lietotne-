document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('category-form');
    const categoryInput = document.getElementById('category-input');
    const categoriesContainer = document.getElementById('categories-container');

    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    function saveCategories() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    // Function to render tasks
    function renderTasks(tasks, taskListElement) {
        taskListElement.innerHTML = '';
        tasks.forEach((task, taskIndex) => {
            const li = document.createElement('li');
            li.textContent = task;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                tasks.splice(taskIndex, 1);
                saveCategories();
                renderCategories();
            });
            li.appendChild(deleteButton);
            taskListElement.appendChild(li);
        });
    }

    function renderCategories() {
        categoriesContainer.innerHTML = '';
        categories.forEach((category, categoryIndex) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            
            const categoryHeader = document.createElement('div');
            categoryHeader.classList.add('category-header');
            
            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.title;
            categoryHeader.appendChild(categoryTitle);
            
            const deleteCategoryButton = document.createElement('button');
            deleteCategoryButton.textContent = 'Dzēst krātuvi';
            deleteCategoryButton.addEventListener('click', () => {
                categories.splice(categoryIndex, 1);
                saveCategories();
                renderCategories();
            });
            categoryHeader.appendChild(deleteCategoryButton);
            
            categoryDiv.appendChild(categoryHeader);
            
            const taskForm = document.createElement('form');
            taskForm.classList.add('task-form');
            const taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.placeholder = 'Krātuve nosaukums';
            taskInput.required = true;
            const addTaskButton = document.createElement('button');
            addTaskButton.type = 'submit';
            addTaskButton.classList.add('btn');
            addTaskButton.textContent = 'Pievienot krātuvi';
            taskForm.appendChild(taskInput);
            taskForm.appendChild(addTaskButton);
            
            taskForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const task = taskInput.value.trim();
                if (task) {
                    category.tasks.push(task);
                    taskInput.value = '';
                    saveCategories();
                    renderCategories();
                }
            });
            
            categoryDiv.appendChild(taskForm);
            
            const taskList = document.createElement('ul');
            renderTasks(category.tasks, taskList);
            categoryDiv.appendChild(taskList);
            
            categoriesContainer.appendChild(categoryDiv);
        });
    }

    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const category = categoryInput.value.trim();
        if (category) {
            categories.push({ title: category, tasks: [] });
            categoryInput.value = '';
            saveCategories();
            renderCategories();
        }
    });

    renderCategories();
});