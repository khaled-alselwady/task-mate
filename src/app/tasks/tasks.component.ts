import {
  Component,
  computed,
  DestroyRef,
  DoCheck,
  inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from './tasks.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
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
    const userId = parseFloat(this.userId());
    const subscription = this.tasksService.loadUserTasks(userId).subscribe({
      next: (userTasks) => {
        this.userTasks.set(userTasks);
        this.updateUserTasks(userTasks);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  updateUserTasks(userTasks: Task[]) {
    this.userTasks.set(userTasks);
  }
}
