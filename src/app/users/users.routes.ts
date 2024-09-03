import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
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
  },
  {
    path: 'tasks/new', // <baseUrl>/users/<userId>/tasks/new
    component: NewTaskComponent,
  },
];
