import { CanActivate, ExecutionContext } from '@nestjs/common';

export interface SessionData {
  userId?: number;
}

interface AuthenticatedRequest extends Request {
  session: SessionData;
}

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return Boolean(request.session?.userId);
  }
}
