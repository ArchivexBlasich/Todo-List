import addProjectModal, {createItem} from "./modals/addProjectModal";
import removeProjectModal from "./modals/removeProjectModal";
import { events } from "../../utils/pubsub";

const projectDOM = function() {
    addProjectModal();
    removeProjectModal();

    // bind event
    events.on("projectInit", render)

    function render(projects) {
        let nav = document.querySelector(".navbar-nav");

        projects.map((project, index) => {
            let newProject = createItem(project.name);
            if (index === 0) newProject.classList.toggle('current-project');
            nav.appendChild(newProject);
        }); 
    }

};

export default projectDOM;