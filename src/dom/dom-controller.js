import projectDOM from "./project/project-dom-controller";
import todoDOM from "./todolist/todo-dom-controller";

const domController = (function() {
    projectDOM();
    todoDOM();
})();

export default domController;