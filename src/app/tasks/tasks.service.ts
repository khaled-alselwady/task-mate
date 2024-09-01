import { inject, Injectable, OnInit, signal } from '@angular/core';

import { Task, type NewTaskData } from './task/task.model';
import { HttpClient } from '@angular/common/http';
import { pipe, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService implements OnInit {
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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  removeTask(id: string) {
    this.httpClient.delete(`${this.baseUrl}/${id}`);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }
}
