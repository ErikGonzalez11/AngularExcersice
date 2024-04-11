import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from 'src/app/models/todo.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() selectedTask = new ToDo();
  @Output() taskCreated = new EventEmitter<ToDo>();
  taskForm: FormGroup;
  taskId!:string;

  constructor(private fb: FormBuilder, private userService: UserService , private route: ActivatedRoute) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTask) {
      this.taskForm.get('title')?.setValue(this.selectedTask.title);
      this.taskForm.get('description')?.setValue(this.selectedTask.description);
      this.taskForm.get('dueDate')?.setValue(this.selectedTask.dueDate);
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const title = this.route.snapshot.paramMap.get('title');
    const description = this.route.snapshot.paramMap.get('description');
    const dueDate = this.route.snapshot.paramMap.get('dueDate');
    console.log("Id:"+id);
    console.log("Title:"+title);
    console.log("Description:"+description);
    console.log("Date:"+dueDate);
  }

  save(): void {
    if (this.selectedTask) { // Verificar si selectedTask no es null
      // Llamar al servicio para guardar la tarea
      this.userService.updateTask(this.selectedTask).subscribe(updatedTask => {
        console.log('Tarea actualizada:', updatedTask);
        // Aquí puedes agregar la lógica para manejar la respuesta, por ejemplo, emitir el evento taskCreated
        this.taskCreated.emit(updatedTask);
        this.taskForm.reset();
      });
    }
  
  }
}
