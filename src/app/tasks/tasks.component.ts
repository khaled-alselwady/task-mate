import { Component, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

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

export const resolveUserTasks: ResolveFn<Task[]> = async (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userId = +(activatedRouteSnapshot.paramMap.get('userId') || '0');
  const order = activatedRouteSnapshot.queryParams['order'];
  const tasksService = inject(TasksService);

  let userTasks = await firstValueFrom(
    tasksService.loadUserTasks(userId).pipe(map((res) => res as Task[]))
  );

  if (order && order === 'desc') {
    userTasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  } else {
    userTasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  return userTasks.length ? userTasks : [];
};
