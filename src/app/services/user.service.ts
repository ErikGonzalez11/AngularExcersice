import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from 'src/environments/Endpoints';
import { switchMap  } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  loginUser(email: string, password: string){
    return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`);
  }
  getAllTasks(email:string): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(`http://localhost:3000/users?email=${email}`);
  }
  updateTaskCompletion(task: ToDo): Observable<ToDo> {
    const url = `http://localhost:3000/todoList/${task.id}`;
    return this.httpClient.put<ToDo>(url, task);
  }
  updateTask(task: ToDo): Observable<ToDo> {
    const { id, ...taskData } = task; // Extraer el ID de la tarea y los datos restantes
    console.log(task.id)
    return this.httpClient.put<ToDo>(`http://localhost:3000/users/${id}`, taskData);
  }
  deleteUserTask(email: string, taskId: string): Observable<User> {
    const url = `http://localhost:3000/users/${email}/todoList/${taskId}`; // Incluir el ID de la tarea en el URL
    return this.httpClient.get<User>(url).pipe(
      switchMap((user: User) => {
        // Busca la tarea en la lista de tareas del usuario
        const taskIndex = user.todoList.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          // Elimina la tarea del arreglo
          user.todoList.splice(taskIndex, 1);
        }
        // Actualiza el usuario en la base de datos
        return this.httpClient.put<User>(url, user);
      })
    );
  }
  





}
