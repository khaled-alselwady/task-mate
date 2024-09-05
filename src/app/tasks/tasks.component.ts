import { Component, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>(); // get from the path (route)
  order = input<'asc' | 'desc' | undefined>(); // get from the query parameters
  userTasks = input.required<Task[]>(); // get from resolver
}
