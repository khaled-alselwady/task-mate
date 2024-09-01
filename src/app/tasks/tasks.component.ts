import {
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  //userId = signal('');
  userTasks: Task[] = [];
  //private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    // const subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) => {
    //     this.userId.set(paramMap.get('userId') || '');
    //   },
    // });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
