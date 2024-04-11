import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToDo } from 'src/app/models/todo.model';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: ToDo[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const email = params['email'];
      this.getAllTasks(email);
    });
  }

  getAllTasks(email: string): void {
    this.userService.getAllTasks(email).subscribe(response => {
      if (response.length > 0 && response[0].hasOwnProperty('todoList')) {
        this.tasks = response[0].todoList;
        // console.log(this.tasks);
      } else {
        console.log('No hay tareas para mostrar.');
      }
    });
  }
  toggleCompleted(task: ToDo): void {
    task.completed = !task.completed; 
    this.userService.updateTaskCompletion(task).subscribe(updatedTask => {
      console.log('Tarea actualizada:', updatedTask);
    });
  }
  editTask(task: ToDo): void {
    this.router.navigate(['/editar', task.id]);
  }
  deleteTask( taskId: string): void {
    const email = this.route.snapshot.params['email'];
    console.log("email: "+email+" id: "+taskId)
    this.userService.deleteUserTask(email,taskId).subscribe(() => {
      // Actualiza la lista de tareas después de eliminar
      this.getAllTasks(this.route.snapshot.params['email']);
    });
}


  
  
  

}
