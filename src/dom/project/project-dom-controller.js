import addProjectModal, {createItem} from "./modals/addProjectModal";
import removeProjectModal from "./modals/removeProjectModal";
import { events } from "../../utils/pubsub";

const projectDOM = function() {
    addProjectModal();
    removeProjectModal();

    // bind event
    events.on("projectInit", init)

    function init(project) {
        let nav = document.querySelector(".navbar-nav");
        let newProject = createItem(project.name);
        newProject.classList.toggle('current-project')

        nav.appendChild(newProject);
    }
};

export default projectDOM;