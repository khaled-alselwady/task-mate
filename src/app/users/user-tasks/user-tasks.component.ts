import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user/user.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
})
export class UserTasksComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  users = signal<User[]>([]);
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);
  username = '';

  private updateUsername() {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.username =
          this.users().find(
            (u) => u.id === parseFloat(paramMap.get('userId') || '0')
          )?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private updateUsers() {
    const subscription = this.usersService
      .loadUsers()
      .pipe(map((res) => res as User[]))
      .subscribe({
        next: (users) => this.users.set(users),
        complete: () => this.updateUsername(),
      });

    // Clean up the subscription on component destroy
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngOnInit() {
    this.updateUsers();
  }
}
