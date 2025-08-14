import { createNewElement } from "../../../utils/utils.js"
import { events } from "../../../utils/pubsub.js";

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
            // check if already exist a project with that name
            for (const option of nav.children) {
                if (input.value === option.dataset.name) {
                    closeDialog();
                    return;
                }
            }

            // if not, i add the item
            const newProjectList = createItem(input.value);
            for (const option of nav.children) {
                if (option.classList.contains('current-project')) {
                    option.classList.toggle('current-project');
                }
            }
            newProjectList.classList.toggle('current-project');
            nav.appendChild(newProjectList);
            events.emit("newProject", input.value);
            input.value = "";
            closeDialog();
        }
    }

    function closeDialog() {
        addProjectDialog.close();
    }
};

export function createItem(itemText) {
    const li = createNewElement("li")
    const span = createNewElement("span");

    span.textContent = itemText;

    li.appendChild(span);
    li.dataset.name = itemText;
    li.classList.add = "nav-item";

    li.addEventListener("click", (e) => {
        const nav = document.querySelector(".navbar-nav");
        for (const option of nav.children) {
            if (option.classList.contains('current-project')) {
                option.classList.toggle('current-project');
            }
        }
        e.currentTarget.classList.toggle('current-project');
        events.emit("newSelectedProject", e.currentTarget.dataset.name);
    });

    return li;
}