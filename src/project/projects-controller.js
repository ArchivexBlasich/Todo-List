import Project from "./project";

const project_controller = (function() {
    let projects = [];
    projects.push(new Project("Default"));

    function addProject(name) {
        let projectWithSameName = (project) => project.name === name;

        if (!projects.some(projectWithSameName)) {
            projects.push(new Project(name));
        } else {
            console.log("Already exits an project with that name");
        }
    };

    function removeProject(name) {
        projects = projects.filter(project => project.name !== name);
    }

    function showProjects() {
        projects.map(project => console.log(project));
    }

    function getCurrentProject() {
        return projects.at(-1);
    }

    return {
        addProject,
        removeProject,
        showProjects,
        getCurrentProject, 
        projects,
    }
}) ();

export default project_controller;