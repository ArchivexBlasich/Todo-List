import addProjectModal from "./modals/addProjectModal";
import removeProjectModal from "./modals/removeProjectModal";

const domProject = (function() {
    let addProject = addProjectModal();
    let removeProject = removeProjectModal();
})()

export default domProject;