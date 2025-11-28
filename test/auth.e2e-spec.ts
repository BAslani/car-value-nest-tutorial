import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { User } from 'src/users/user.entity';

describe('Authentication system', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'testemail2@gmail.com',
        password: 'test',
      })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body as Partial<User>;
        expect(id).toBeDefined();
        expect(email).toBe('testemail2@gmail.com');
      });
  });
});
