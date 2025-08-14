import Project from "./project";
import { events } from "../utils/pubsub";


const project_controller = (function () {
    let projects = [];

    // bind events
    events.on("newProject", addProject);
    events.on("newSelectedProject", setCurrentProject);
    events.on("removeProject", removeProject);

    function init() {
        projects.push(new Project("Default"));
        loadStorage();
        events.emit("projectInit", projects);
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
        removeProjectLocalStorage(name);
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

    function loadStorage() {
        if (localStorage.length === 0) {
            return;
        }

        const allLocalStorageItems = {};
        Object.keys(localStorage).forEach(key => {
            allLocalStorageItems[key] = localStorage.getItem(key);
        });

        for (const key in allLocalStorageItems) {
            if (Object.prototype.hasOwnProperty.call(allLocalStorageItems, key)) {
                const element = JSON.parse(allLocalStorageItems[key]);

                if (!projects.some((project => project.name === element.project))) {
                    let newProject = new Project(element.project);
                    newProject.todo_list.push(element);
                    projects.push(newProject);
                } else {
                    for (const project of projects) {
                        if (project.name === element.project) {
                            project.todo_list.push(element);
                        }
                    }
                }
            }
        }
    }

    function removeProjectLocalStorage(name) {
        const allLocalStorageItems = {};
        Object.keys(localStorage).forEach(key => {
            allLocalStorageItems[key] = localStorage.getItem(key);
        });

        for (const key in allLocalStorageItems) {
            if (Object.prototype.hasOwnProperty.call(allLocalStorageItems, key)) {
                const element = JSON.parse(allLocalStorageItems[key]);

                if (element.project === name) {
                    localStorage.removeItem(`${element.project}${element.title}`); 
                }
            }
        }
    }

    init();
})();

export default project_controller;