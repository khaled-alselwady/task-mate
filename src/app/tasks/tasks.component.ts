import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnChanges, OnInit {
  userId = input.required<string>();
  //order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc' | undefined>(undefined);
  userTasks = signal<Task[]>([]);
  private destroyRef = inject(DestroyRef);
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);

  private destroyedSubscription(subscription: any) {
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.order.set(params['order']);
      },
    });

    this.destroyedSubscription(subscription);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if 'userId' has changed
    if (changes['userId']) {
      this.fetchUserTasks();
    }
  }

  private fetchUserTasks() {
    const subscription = this.tasksService
      .loadUserTasks(+this.userId())
      .subscribe({
        next: (userTasks) => {
          this.userTasks.set(userTasks);
        },
      });

    this.destroyedSubscription(subscription);
  }
}
