import { User } from '@prisma/client';

export interface TokenSignUpResponse {
  access_token: string;
}

export interface JwtSignPayload {
  sub: User['id'];
  name: User['name'];
}
