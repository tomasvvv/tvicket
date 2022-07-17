import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';
import { JwtSignPayload } from '../types/jwt';
import { StrategyName } from '../types/strategies';
@Injectable()
export class JwtStrategyProvider extends PassportStrategy(
  Strategy,
  StrategyName.JWT,
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtSignPayload) {
    const { sub } = payload;

    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    });

    delete user.password;
    return user;
  }
}
