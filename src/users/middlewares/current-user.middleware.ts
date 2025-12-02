import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

import { Request } from 'express';
import { User } from '../user.entity';

export interface CurrentUserRequest extends Request {
  session?: {
    userId?: number;
  };
  currentUser?: User | null;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: CurrentUserRequest, res: Response, next: NextFunction) {
    const userId = req.session?.userId;

    if (typeof userId === 'number') {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user ?? null;
    }

    next();
  }
}
