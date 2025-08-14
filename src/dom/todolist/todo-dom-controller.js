import addTodoModal, {createTodo} from "./modals/addTodo";
import { events } from "../../utils/pubsub";

const todoDOM = function() {
    addTodoModal();

    // bind events
    events.on("changeProject", render)

    // handlers
    function render(todos) {
        const todosContainer = document.querySelector(".todos-container");

        todosContainer.innerHTML = "";
        todos.map((todo) => {
            todosContainer.appendChild(createTodo(todo));
        });
    }

};

export default todoDOM;