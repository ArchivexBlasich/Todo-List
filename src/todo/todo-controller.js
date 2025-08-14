import { events } from "../utils/pubsub.js";
import Todo from "./todo.js";

const todo_controller = (function() {
    // variable
    let currentProject;

    // bind events
    events.on("newCurrentProject", changeCurrentProject);
    events.on("newTodo", addTodo);
    events.on("removeTodo", removeTodo);

    // functions

    function addTodo(todo) {
        currentProject.todo_list.push(new Todo(todo.title, todo.description, todo.dueDate, todo.priority));
        populateStorage(todo);
    }

    function removeTodo(todo) {
        unPopulateStorage(todo);

        currentProject.todo_list = currentProject.todo_list.filter(e => {
            return (e.title !== todo.title || e.description !== todo.description
                || e.dueDate !== todo.dueDate || e.priority !== todo.priority);
        });
    }

    
    function changeCurrentProject(project) {
        currentProject = project;
        events.emit("changeProject", currentProject.todo_list);
    }

    function populateStorage(todo) {
        todo.project = currentProject.name;
        localStorage.setItem(`${currentProject.name}${todo.title}`, JSON.stringify(todo));
    }

    function unPopulateStorage(todo) {
        localStorage.removeItem(`${currentProject.name}${todo.title}`); 
    }
    
    // Function use to debug in console
    function showTodos() {
        currentProject.todo_list.map(todo => console.log(todo));
    }
})();

export default todo_controller;