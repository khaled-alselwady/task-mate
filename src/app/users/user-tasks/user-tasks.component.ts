import { Component, inject, input, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user/user.model';
import { map } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  @Input() message: string = '';
  username = input.required<string>();
}

// Resolver function
export const resolveUsername: ResolveFn<Promise<string>> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
): Promise<string> => {
  const usersService = inject(UsersService);

  // Await the data to be fetched before returning
  const users = await firstValueFrom(
    usersService.loadUsers().pipe(map((res) => res as User[]))
  );

  // Find the username
  const username =
    users.find((u) => u.id === +(activatedRoute.paramMap.get('userId') || '0'))
      ?.name || '';

  return username;
};
