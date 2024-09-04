import { Injectable } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user/user.model';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolverService {
  private username: string | null = null;

  constructor(private usersService: UsersService) {}

  async fetchUsername(userId: number): Promise<string> {
    const users = await firstValueFrom(
      this.usersService.loadUsers().pipe(map((res) => res as User[]))
    );

    this.username = users.find((u) => u.id === userId)?.name || '';

    return this.username;
  }
}
