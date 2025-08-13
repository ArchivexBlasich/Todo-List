import Todo from "./todo.js";

const todo_controller = function(defaultProject) {
    let currentProject = defaultProject;

    function addTodo(todo) {
        currentProject.todo_list.push(new Todo(todo.title, todo.description, todo.dueDate, todo.priority));
    }

    function removeTodo(todo) {
        currentProject.todo_list = currentProject.todo_list.filter(e => e.title != todo.title)
    }

    function showTodos() {
        currentProject.todo_list.map(todo => console.log(todo));
    }

    function changeCurrentProject(project) {
        currentProject = project;
    }

    return {
        addTodo,
        removeTodo,
        changeCurrentProject,
        showTodos,
        currentProject,
    }
};

export default todo_controller;