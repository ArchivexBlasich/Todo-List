export default function removeProjectModal() {
    // variables
    const removeProjectBtn = document.querySelector(".navbar button.remove");
    const removeProjectDialog = document.querySelector("#removeProject");

    const select = document.querySelector("#removeProject form select");
    const nav = document.querySelector(".navbar-nav");

    const removeDialogBtn = document.querySelector("#removeProject div:last-of-type button:nth-child(1)");
    const cancelDialogBtn = document.querySelector("#removeProject div:last-of-type button:nth-child(2)");
    // binds events
    removeProjectBtn.addEventListener("click", removeProjectModal);
    removeDialogBtn.addEventListener("click", removeProject)
    cancelDialogBtn.addEventListener("click", closeDialog)

    // functions
    function removeProjectModal() {
        removeProjectDialog.showModal();

        // load projects in <select>
        select.innerHTML = "";

        let projects = Array.from(nav.children);
        projects.forEach(project => {
            select.appendChild(createOption(project.dataset.name));
        });
    }

    function removeProject() {
        for (const option of nav.children) {
            if (select.value === option.dataset.name) {
                option.remove();
            }
        }
        closeDialog();
    }

    function closeDialog() {
        removeProjectDialog.close();
    }
};

function createOption(name) {
    let option = document.createElement("option")
    option.value = name;
    option.textContent = name;

    return option;
}