import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { resolveTitle } from './user-tasks/user-tasks.component';
import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { firstValueFrom, map } from 'rxjs';

async function resolveUserTasks(
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) {
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
}

export const routes: Routes = [
  {
    path: '', // <baseUrl>/users/<userId>
    redirectTo: 'tasks',
    pathMatch: 'full', // redirect to /users/<userId>/tasks if no other path matches
  },
  {
    path: 'tasks', // <baseUrl>/users/<userId>/tasks
    loadComponent: () =>
      import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
    title: resolveTitle,
  },
  {
    path: 'tasks/new', // <baseUrl>/users/<userId>/tasks/new
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
