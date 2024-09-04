import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '', // <baseUrl>/users/<userId>
    redirectTo: 'tasks',
    pathMatch: 'full', // redirect to /users/<userId>/tasks if no other path matches
  },
  {
    path: 'tasks', // <baseUrl>/users/<userId>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new', // <baseUrl>/users/<userId>/tasks/new
    component: NewTaskComponent,
  },
];
