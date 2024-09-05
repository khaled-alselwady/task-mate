import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUsername,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segment) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();

  if (shouldGetAccess > 0.5) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', // <baseUrl>/
    component: NoTaskComponent,
    // redirectTo: '/users/1',
    // pathMatch: 'full', // redirect to /users/2 if no other path matches
    title: 'No Task Selected',
  },
  {
    path: 'users/:userId', // <baseUrl>/users/<userId>
    component: UserTasksComponent,
    loadChildren: () =>
      import('./users/users.routes').then((mod) => mod.routes),
    // canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      username: resolveUsername,
    },
  },
  {
    path: '**', // catch-all for 404
    component: NotFoundComponent,
    title: 'Page Not Found',
  },
];
