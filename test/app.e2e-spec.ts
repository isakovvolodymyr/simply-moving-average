import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rates/{period} (GET) success', () => {
    return request(app.getHttpServer())
      .get('/api/v1/rates/7')
      .expect(200)
  });

  it('/rates/{period} (GET) validation error', () => {
    return request(app.getHttpServer())
        .get('/api/v1/rates/8')
        .expect(422)
  });
});
