import { createNewElement } from "../../../utils/utils";

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
            console.log(titleInput.value);
            console.log(priorityInput.value);
            console.log(dueDateInput.value);
            console.log(descriptionInput.value);

            todosContainer.appendChild(createTodo(titleInput.value, 
                descriptionInput.value, 
                dueDateInput.value,
                priorityInput.value));

            closeDialog();
        }

    }

    function closeDialog() {
        addTodoDialog.close();
    }
}

function createTodo(title, description, dueDate, priority) {
    let article = createNewElement("article");
    let heading = createNewElement("h1");
    let date = createNewElement("div");
    let desc = createNewElement("p");
    let deleteBtn = createNewElement("button");
    let deleteIcon = createNewElement("i");

    heading.textContent = title;

    date.innerHTML = `<i class="fa-solid fa-calendar"></i>${dueDate}`

    desc.textContent = description;

    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.classList.add("remove");

    deleteBtn.addEventListener("click", (e) => {
        e.currentTarget.parentElement.remove();
    })

    article.appendChild(heading);
    article.appendChild(date);
    article.appendChild(desc);
    article.appendChild(deleteBtn);

    setPriorityBackground(article, priority);

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