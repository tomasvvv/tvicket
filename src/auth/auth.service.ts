import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';

import { SignupDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtSignPayload, TokenSignUpResponse } from './types/jwt';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: SignupDto) {
    const { password, name } = dto;

    const hash = await argon.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          password: hash,
        },
        select: {
          id: true,
        },
      });

      return this.signToken(user.id, name);
    } catch (err) {
      if (err.code === PrismaError.UniqueConstraintViolation) {
        throw new ForbiddenException('Name already in use');
      }
      throw err;
    }
  }

  async signIn(dto: SigninDto) {
    const { password, name } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
      select: {
        password: true,
        id: true,
      },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect name/password');
    }

    const match = await argon.verify(user.password, password);

    if (!match) {
      throw new ForbiddenException('Incorrect name/password');
    }

    return this.signToken(user.id, name);
  }

  async signToken(
    id: User['id'],
    name: User['name'],
  ): Promise<TokenSignUpResponse> {
    const payload: JwtSignPayload = {
      sub: id,
      name,
    };
    const secret = this.config.get('JWT_TOKEN_SECRET');
    const expiresIn = this.config.get('JWT_EXPIRATION_TIME');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn,
      secret,
    });

    return {
      access_token,
    };
  }
}
