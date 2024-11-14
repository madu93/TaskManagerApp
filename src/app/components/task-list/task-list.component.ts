import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'] // Ensure you have a CSS file if needed
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load tasks from the API
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (error) => console.error('Error loading tasks:', error),
    });
  }

  // Delete a task and reload the list
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      error: (error) => console.error('Error deleting task:', error),
    });
  }

  // Toggle completion and update the task list
  toggleCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error) => console.error('Error toggling completion:', error),
    });
  }
}
