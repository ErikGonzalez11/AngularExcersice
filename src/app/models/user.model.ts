import { ToDo } from "./todo.model";

export class BaseUserLogin {
    email: string;
    password: string;
    constructor() {
        this.email = '';
        this.password = '';
    }
}
 
export class User extends BaseUserLogin {
    id: string | null;
    todoList: ToDo[]; // Agrega la propiedad 'todoList' aquí

    constructor() {
        super();
        this.id = null;
        this.todoList = []; // Inicializa todoList como un arreglo vacío
    }
}
