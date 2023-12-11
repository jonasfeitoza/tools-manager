import { createParamDecorator } from '@nestjs/common';

type JwtPayload = {
  userId: string;
  email: string;
};

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
