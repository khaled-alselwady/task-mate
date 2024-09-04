import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { resolveTitle } from './user-tasks/user-tasks.component';

export const routes: Routes = [
  {
    path: '', // <baseUrl>/users/<userId>
    redirectTo: 'tasks',
    pathMatch: 'full', // redirect to /users/<userId>/tasks if no other path matches
  },
  {
    path: 'tasks', // <baseUrl>/users/<userId>/tasks
    component: TasksComponent,
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
