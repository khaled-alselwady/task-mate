import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  users = signal<User[]>([]);
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  username = computed(
    () =>
      this.users().find((user) => user.id === parseFloat(this.userId()))?.name
  );

  ngOnInit() {
    const subscription = this.usersService.loadUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
