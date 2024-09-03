import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  signal,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnChanges {
  userId = input.required<string>();
  userTasks = signal<Task[]>([]);
  private destroyRef = inject(DestroyRef);
  private tasksService = inject(TasksService);

  ngOnChanges(): void {
    this.fetchUserTasks();
  }

  private fetchUserTasks() {
    const subscription = this.tasksService
      .loadUserTasks(+this.userId())
      .subscribe({
        next: (userTasks) => {
          this.userTasks.set(userTasks);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
