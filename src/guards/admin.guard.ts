import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

interface AdminRequest extends Request {
  currentUser: User;
}

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AdminRequest>();
    if (!request.currentUser) return false;

    return request.currentUser.admin;
  }
}
