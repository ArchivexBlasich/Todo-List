import {createNewElement} from "../../../utils/utils.js"

export default function addProjectModal() {
    // variables
    const addProjectBtn = document.querySelector(".navbar button.add");
    const addProjectDialog = document.querySelector("#addProject");

    const input = document.querySelector("#addProject form input");
    const nav = document.querySelector(".navbar-nav");

    const createDialogBtn = document.querySelector("#addProject div:last-of-type button:nth-child(1)");
    const cancelDialogBtn = document.querySelector("#addProject div:last-of-type button:nth-child(2)");
    // binds events
    addProjectBtn.addEventListener("click", addProjectModal);
    createDialogBtn.addEventListener("click", addProject)
    cancelDialogBtn.addEventListener("click", closeDialog)

    // functions
    function addProjectModal() {
        addProjectDialog.showModal();
    }

    function addProject() {
        if (input.value) {
            const newProjectList = createItem(input.value);
            nav.appendChild(newProjectList);
            input.value = "";
            closeDialog();
        }
    }

    function closeDialog() {
        addProjectDialog.close();
    }
};

function createItem(itemText) {
    const li = createNewElement("li")
    const span = createNewElement("span");

    span.textContent = itemText;

    li.appendChild(span);
    li.dataset.name = itemText;
    li.classList.add = "nav-item";

    return li;
}