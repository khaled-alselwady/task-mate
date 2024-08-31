import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private users = signal<User[]>([]);
  private urlAPI = 'https://localhost:7067/api/users';

  loadedUsers = this.users.asReadonly();

  constructor() {
    this.loadUsers().subscribe();
    this.loadUsernames().subscribe();
  }

  loadUsers() {
    const users: User[] = [];
    return this.fetchData(`${this.urlAPI}/all`, users).pipe(
      tap((users) => this.users.set(users))
    );
  }

  loadUsernames() {
    const usernames: string[] = [];
    return this.fetchData(`${this.urlAPI}/all-username`, usernames);
  }

  private fetchData(url: string, data: any) {
    return this.httpClient.get<typeof data>(url);
  }
}
