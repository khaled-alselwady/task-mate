import { inject, Injectable, signal } from '@angular/core';

import { Task, type NewTaskData } from './task/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private httpClient = inject(HttpClient);
  private tasks = signal<Task[]>([]);
  private baseUrl = 'https://localhost:7067/api/tasks';

  allTasks = this.tasks.asReadonly();

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }

  loadTasks() {
    return this.fetchData(`${this.baseUrl}/all`);
  }

  loadUserTasks(userId: number) {
    return this.fetchData(`${this.baseUrl}/user/${userId}`);
  }

  private fetchData(url: string) {
    return this.httpClient.get<Task[]>(url);
  }

  addTask(taskData: NewTaskData) {
    return this.httpClient.post<Task[]>(`${this.baseUrl}`, taskData);
  }

  removeTask(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
