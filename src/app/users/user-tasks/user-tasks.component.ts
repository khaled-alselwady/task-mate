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
import { UserResolverService } from '../user/user-resolver.service';

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
export const resolveUsername: ResolveFn<string> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userResolveService = inject(UserResolverService);
  const userId = +(activatedRoute.paramMap.get('userId') || '0');

  const username = userResolveService.fetchUsername(userId);

  return username;
};

export const resolveTitle: ResolveFn<string> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const username = await resolveUsername(activatedRoute, routerState);
  return `${username}'s Tasks`;
};
