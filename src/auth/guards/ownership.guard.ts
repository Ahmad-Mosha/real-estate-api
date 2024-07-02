import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = request.params.id;

    const targetUser = await this.usersService.findOneById(userId);

    if (!targetUser) {
      throw new UnauthorizedException('User not found');
    }

    if (targetUser.id !== user.id && user.role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have permission to modify this user',
      );
    }

    return true;
  }
}
