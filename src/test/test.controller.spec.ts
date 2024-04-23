import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/user/user.controller';
// import { TestController } from './test.controller';
import * as request from 'supertest';
import { UserModule } from '../../src/user/user.module';
import { UserService } from '../../src/user/user.service';
import { INestApplication } from '@nestjs/common';

describe('User Test', () => {
  let app: INestApplication;
  let usersService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserModule)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    return request(app.getHttpServer())
      .get('/api/user')
      .expect(200)
      .expect({
        data: usersService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});