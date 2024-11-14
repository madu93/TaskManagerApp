// src/app/components/task-form/task-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  @Input() task: Task = { title: '', description: '', isCompleted: false, createdAt: new Date() };
  @Output() taskSaved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  saveTask() {
    if (this.task.id) {
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.addTask(this.task);
    }
    this.taskSaved.emit();
  }
}
