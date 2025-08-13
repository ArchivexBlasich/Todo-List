import "./style.css";
import project_controller from "./project/projects-controller.js";
import todoController from "./todo/todo-controller.js";

import domProject from "./dom/project/project.js";

domProject;

let todo_controller = todoController(project_controller.getCurrentProject());
console.log(todo_controller.currentProject);

let todo = {
    title: "Cook",
    description: "Prepare lunch for tomorrow",
    dueDate: "14/08/2001",
    priority: 1,
};

let todo2 = {
    title: "sleep",
    description: "go to sleep",
    dueDate: "13/08/2001",
    priority: 2,
}

let todo3 = {
    title: "study",
    description: "study javascript",
    dueDate: "13/08/2001",
    priority: 2,
}

console.log(todo_controller.currentProject);
todo_controller.addTodo(todo);
todo_controller.addTodo(todo2);
todo_controller.addTodo(todo3);
todo_controller.showTodos();
console.log('');
todo_controller.removeTodo(todo2);
todo_controller.showTodos();

project_controller.addProject("Uni");
console.log(project_controller.projects);
todo_controller.changeCurrentProject(project_controller.getCurrentProject());
console.log(project_controller.getCurrentProject());

let todo4 = {
    title: "gym",
    description: "do exercise",
    dueDate: "13/08/2001",
    priority: 4,
}

todo_controller.addTodo(todo4);

console.log(project_controller.projects);

