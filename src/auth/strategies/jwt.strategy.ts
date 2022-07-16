import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtSignPayload } from '../types/jwt';
import { StrategyName } from '../types/strategies';

export class JwtStrategyProvider extends PassportStrategy(
  Strategy,
  StrategyName.JWT,
) {
  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtSignPayload) {
    const { sub, name } = payload;

    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
        name,
      },
    });

    delete user.password;
    return user;
  }
}
