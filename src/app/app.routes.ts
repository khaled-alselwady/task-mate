import { Routes } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUsername,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    children: userRoutes,
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
