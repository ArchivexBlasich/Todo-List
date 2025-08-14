import { createNewElement } from "../../../utils/utils";
import { events } from "../../../utils/pubsub";

export default function addTodoModal() {
    // variables
    const addTodoBtn = document.querySelector("main button.remove");
    const addTodoDialog = document.querySelector("#add-todo-dialog");

    const titleInput = document.querySelector("#add-modal-title");
    const priorityInput = document.querySelector("#add-modal-priority");
    const dueDateInput = document.querySelector("#add-modal-dueDate");
    const descriptionInput = document.querySelector("#add-modal-description");

    const createDialogBtn = document.querySelector("#add-todo-dialog div:last-of-type button:nth-child(1)");
    const cancelDialogBtn = document.querySelector("#add-todo-dialog div:last-of-type button:nth-child(2)");

    const todosContainer = document.querySelector(".todos-container");

    // bind events
    addTodoBtn.addEventListener("click", addTodoModal);
    createDialogBtn.addEventListener("click", addTodo)
    cancelDialogBtn.addEventListener("click", closeDialog);

    // functions
    function addTodoModal() {
        addTodoDialog.showModal();
    }

    function addTodo() {
        if (titleInput.value && priorityInput
            && dueDateInput.validity.valid === true
        ) {
            let todo = {
                title: titleInput.value, 
                description: descriptionInput.value, 
                dueDate: dueDateInput.value, 
                priority: priorityInput.value,
            }

            todosContainer.appendChild(createTodo(todo));

            events.emit("newTodo", todo)
            closeDialog();
        }

    }

    function closeDialog() {
        addTodoDialog.close();
    }
}

export function createTodo(todo) {
    let article = createNewElement("article");
    let heading = createNewElement("h1");
    let date = createNewElement("div");
    let desc = createNewElement("p");
    let deleteBtn = createNewElement("button");
    let deleteIcon = createNewElement("i");

    heading.textContent = todo.title;

    date.innerHTML = `<i class="fa-solid fa-calendar"></i>${todo.dueDate}`

    desc.textContent = todo.description;

    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.classList.add("remove");

    deleteBtn.addEventListener("click", (e) => {
        e.currentTarget.parentElement.remove();
        events.emit("removeTodo", todo);
    })

    article.appendChild(heading);
    article.appendChild(date);
    article.appendChild(desc);
    article.appendChild(deleteBtn);

    setPriorityBackground(article, todo.priority);

    return article;
}

function setPriorityBackground(element, priority) {
  // Base color (red in this case)
  const baseColor = '114, 137, 154';

  const maxOpacity = 0.7;
  const minOpacity = 0;

  const opacity = maxOpacity - ((priority - 1) * (maxOpacity - minOpacity) / 4);

  element.style.backgroundColor = `rgba(${baseColor}, ${opacity})`;
}