import Project from "./project";
import { events } from "../utils/pubsub";


const project_controller = (function() {
    let projects = [];

    // bind events
    events.on("newProject", addProject);
    events.on("newSelectedProject", setCurrentProject);

    function init() {
        projects.push(new Project("Default"));
        events.emit("projectInit", projects[0]);
        events.emit("newCurrentProject", projects[0]);
    }

    function addProject(name) {
        let projectWithSameName = (project) => project.name === name;

        if (!projects.some(projectWithSameName)) {
            let newProject = new Project(name);
            projects.push(newProject);
            events.emit("newCurrentProject", newProject);
        } else {
            console.error("Already exits an project with that name");
        }
    };

    function removeProject(name) {
        projects = projects.filter(project => project.name !== name);
    }

    function showProjects() {
        projects.map(project => console.log(project));
    }

    function setCurrentProject(name) {
        for (const project of projects) {
            if (project.name === name) {
                events.emit("newCurrentProject", project);
                return;
            }
        }
    }

    init()

    return {
        addProject,
        removeProject,
        showProjects,
        projects,
    }
}) ();

export default project_controller;