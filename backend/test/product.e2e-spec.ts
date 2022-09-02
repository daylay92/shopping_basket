import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { SeedModule } from '../src/database/seed/seed.module';
import { SeedService } from '../src/database/seed/seed.service';
import mongoose from 'mongoose';
describe('Product Integration Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // Migrate products into db
    const seedApp = await NestFactory.createApplicationContext(SeedModule);
    await seedApp.get(SeedService).seedProducts();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await mongoose.connection.close(true);
  });
  describe('/api/v1/products (GET)', () => {
    it('should return a paginated list of products', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/products')
        .expect(200);
      expect(response.body.data).toHaveLength(5);
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('price');
      expect(response.body.data[0]).toHaveProperty('imageUrl');
    });

    it('should return data based on the provided pagination filters', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/products?pageNumber=1&pageSize=2')
        .expect(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body).toHaveProperty('pagination');
    });
  });
});
