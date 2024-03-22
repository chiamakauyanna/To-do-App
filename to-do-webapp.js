// Define todoList array
const todoList = [];

// Call the renderTodoList function
renderTodoList();

// Render the todo list based on the selected filter
function renderTodoList() {
    const activeFilter = document.querySelector('.filters .active').id;
    let filteredTodoList = [];

    if (activeFilter === 'all') {
        filteredTodoList = todoList;
    } else if (activeFilter === 'pending') {
        filteredTodoList = todoList.filter(item => !item.completed);
    } else if (activeFilter === 'completed') {
        filteredTodoList = todoList.filter(item => item.completed);
    }

    let todoListHTML = '';

    if (filteredTodoList.length === 0) {
        // Clear the task box if there are no tasks
        document.querySelector('.task-box').innerHTML = '';
    } else {
        filteredTodoList.forEach((todoItem, index) => {
            const html = `
                <div class='todo-item' data-index='${index}'>
                    <div class='text-input'>
                        <div class='title ${todoItem.completed ? 'completed' : ''}' contenteditable='${todoItem.editable ? 'true' : 'false'}'>${todoItem.title}</div>
                        <div class='description ${todoItem.completed ? 'completed' : ''}' contenteditable='${todoItem.editable ? 'true' : 'false'}'>${todoItem.description}</div>
                        <div class='due-date ${todoItem.completed ? 'completed' : ''}' contenteditable='${todoItem.editable ? 'true' : 'false'}'>${todoItem.dueDate}</div>
                    </div>
                    <div class='todo-buttons'>
                        <button class="complete-button">${todoItem.completed ? '<i class="fa fa-undo"></i>' : '<i class="fa fa-check"></i>'}</button>
                        <div class="c-text hide">Complete</div>
                        <button class="edit-button" data-index='${index}'><i class="fa fa-edit"></i></button>
                        <div class="e-text hide">Edit</div>
                        <button class="delete-button"><i class="fa fa-trash"></i></button>
                        <div class="d-text hide">Delete</div>
                    </div>
                </div>
            `;
            todoListHTML += html;
        });

        document.querySelector('.task-box').innerHTML = todoListHTML;
    }

    // Add event listener for add button
    document.querySelector('.add-button').addEventListener('click', addTodo);

    // Add event listener for edit button
    document.querySelectorAll('.edit-button').forEach(editButton => {
        editButton.addEventListener('click', () => {
            const index = editButton.getAttribute('data-index');
            clickedEditButton(index);
        });
    });
    // Add event listener for delete button
    document.querySelectorAll('.delete-button').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const index = deleteButton.parentElement.parentElement.getAttribute('data-index');
            clickedDeleteButton(index);
        });
    });
    // Add event listener for complete button
    document.querySelectorAll('.complete-button').forEach(completeButton => {
        completeButton.addEventListener('click', () => {
            const index = completeButton.parentElement.parentElement.getAttribute('data-index');
            clickedCompleteButton(index);
        });
    });
}

//  Function to handle adding a new task to the list
function addTodo() {
    const title = document.querySelector('.title-input').value.trim();
    const description = document.querySelector('.description-input').value.trim();
    const dueDate = document.querySelector('.due-date-input').value.trim();

    if (!title || !description || !dueDate) {
        alert('All fields are required.');
        return;
    }

    todoList.push({ title, description, dueDate, completed: false, editable: false });
    renderTodoList();

    // Clear input fields after adding todo
    clearInputFields();
}

// Function to deleting an existing task from the list
function clickedDeleteButton(index) {
    todoList.splice(index, 1);
    renderTodoList();
}

//  Function for marking a task as completed
function clickedCompleteButton(index) {
    todoList[index].completed = !todoList[index].completed;
    renderTodoList();
}

//  Function for editing an existing task in the list
function clickedEditButton(index) {
    const todoItemElement = document.querySelector(`.todo-item[data-index="${index}"]`);
    const titleElement = todoItemElement.querySelector('.title');
    const descriptionElement = todoItemElement.querySelector('.description');
    const dueDateElement = todoItemElement.querySelector('.due-date');

    // Set contenteditable attribute to true
    titleElement.contentEditable = 'true';
    descriptionElement.contentEditable = 'true';
    dueDateElement.contentEditable = 'true';

    // Add save and cancel button for editing of items in list
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fa fa-save"></i>';
    saveButton.classList.add('save-button');
    saveButton.addEventListener('click', () => saveEditedList(index));

    const cancelButton = document.createElement('button');
    cancelButton.innerHTML = '<i class="fa fa-times"></i>';
    cancelButton.classList.add('cancel-button');
    cancelButton.addEventListener('click', () => renderTodoList());

     // Add text elements for save and cancel buttons
     const saveText = document.createElement('div');
     saveText.textContent = 'Save';
     saveText.classList.add('s-text', 'hide');
 
     const cancelText = document.createElement('div');
     cancelText.textContent = 'Cancel';
     cancelText.classList.add('c2-text', 'hide');

    const todoButtonDiv = todoItemElement.querySelector('.todo-buttons');
    todoButtonDiv.innerHTML = '';
    todoButtonDiv.appendChild(saveButton);
    todoButtonDiv.appendChild(saveText);
    todoButtonDiv.appendChild(cancelButton);
    todoButtonDiv.appendChild(cancelText);

}

//  Save edited item back into array and update on screen
function saveEditedList(index) {
    const todoItemElement = document.querySelector(`.todo-item[data-index="${index}"]`);
    const titleElement = todoItemElement.querySelector('.title');
    const descriptionElement = todoItemElement.querySelector('.description');
    const dueDateElement = todoItemElement.querySelector('.due-date');

    // Get the updated values
    const title = titleElement.textContent.trim();
    const description = descriptionElement.textContent.trim();
    const dueDate = dueDateElement.textContent.trim().split(': ')[1];

    // Update the todoList array with the edited values
    todoList[index].title = title;
    todoList[index].description = description;
    todoList[index].dueDate = dueDate;

    // Set contenteditable attribute to false
    titleElement.contentEditable = 'false';
    descriptionElement.contentEditable = 'false';
    dueDateElement.contentEditable = 'false';

    renderTodoList();
}

// Function to clear input fields after adding a new task or editing an existing
function clearInputFields() {
    document.querySelector('.title-input').value = '';
    document.querySelector('.description-input').value = '';
    document.querySelector('.due-date-input').value = '';
}

// Add event listeners for filter clicks
document.querySelectorAll('.filters span').forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        document.querySelectorAll('.filters span').forEach(f => f.classList.remove('active'));

        // Add active class to clicked filter
        filter.classList.add('active');

        // Render the todo list based on the selected filter
        renderTodoList();
    });
});
