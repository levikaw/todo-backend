import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Payload } from 'src/modules/auth/application/token/payload.interfaces';
import { EXTEPTIONS } from './constants';

export const CurrentUserFromToken = createParamDecorator(
  (_, ctx: ExecutionContext): Payload => {
    try {
      const user = ctx.switchToHttp().getRequest().user;

      if (!user) {
        throw new Error('User not found in request');
      }

      return user;
    } catch (error) {
      Logger.error('Error in CurrentUserFromToken decorator:', error.message);
      throw new Error(EXTEPTIONS.USER_NOT_FOUND);
    }
  },
);
