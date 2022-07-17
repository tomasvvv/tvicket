import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import { SignupDto } from '../src/auth/dto/signup.dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('app', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('auth', () => {
    const signupDto: SignupDto = {
      name: 'testing_name',
      password: 'testing_password',
    };

    describe('signup', () => {
      it('should return 201', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signupDto)
          .expectStatus(201);
      });

      it('should throw error on no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
    });
  });
});
