// Run domLoaded() when the page finishes loading
document.addEventListener("DOMContentLoaded", domLoaded);


/**
 * Sets up the page event handlers.
 */
function domLoaded() 
{
    const addButton = document.querySelector("#add-btn");
    const textBox = document.querySelector("#new-task");

    // Add a task when the Add button is clicked
    addButton.addEventListener("click", addBtnClick);

    // Add a task when Enter is pressed
    textBox.addEventListener("keyup", function(event) 
    {
        if (event.key === "Enter") 
        { 
            addBtnClick(); 
        }
    });

    // Make the existing remove buttons work
    const doneButtons = document.querySelectorAll(".done-btn");

    for (let button of doneButtons) 
    {
        button.addEventListener("click", removeTask);
    }
}


/**
 * Gets the task from the textbox and adds it to the list.
 */
function addBtnClick() 
{
    const textBox = document.querySelector("#new-task");
    const newTask = textBox.value;

    // Do not add an empty task
    if (newTask !== "") 
    {
        addTask(newTask);

        // Clear the textbox after adding the task
        textBox.value = "";
    }

    // Put the cursor back in the textbox
    textBox.focus();
}


/**
 * Adds a new task to the ordered list.
 */
function addTask(newTask) 
{
    const taskList = document.querySelector("#task-list");

    // Create a new list item
    const newListItem = document.createElement("li");

    // Add the task row, task text, and remove button
    newListItem.innerHTML = 
        `<span class="task-row">
            <span class="task-text">${newTask}</span>
            <button class="done-btn">&#10006;</button>
        </span>`;

    // Add the new task to the list
    taskList.appendChild(newListItem);

    // Find all done buttons
    const doneButtons = document.querySelectorAll(".done-btn");

    // Get the newest button
    const lastButton = doneButtons[doneButtons.length - 1];

    // Register its click event
    lastButton.addEventListener("click", removeTask);
}


/**
 * Removes the selected task from the list.
 */
function removeTask(event) 
{
    // The button's parent is the task-row span
    const taskRow = event.target.parentNode;

    // The task-row's parent is the <li>
    const taskItem = taskRow.parentNode;

    // The <li>'s parent is the <ol>
    taskItem.parentNode.removeChild(taskItem);
}