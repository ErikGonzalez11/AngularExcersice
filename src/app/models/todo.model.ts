export class BaseToDo {
    title: string;
    description: string;
    dueDate: string; 
    completed: boolean; // Agregamos la propiedad 'completed'
  
    constructor() {
      this.title = '';
      this.description = '';
      this.dueDate = '';
      this.completed = false; // Inicializamos 'completed' como falso por defecto
    }
  }
  
  export class ToDo extends BaseToDo {
    id: string | null;
    todoList: ToDo[];
  
    constructor() {
      super();
      this.id = null;
      this.todoList = [];
      this.completed = false;
    }
  }
  
  