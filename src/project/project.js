export default class Project {
    constructor(name) {
        this.name = name;

        this.todo_list = [];
    }

    getName() {
        return this.name;
    }

    setName(name) {
        return this.name = name;
    }
}