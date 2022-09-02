import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { NestFactory } from '@nestjs/core';
import { SeedModule } from '../src/database/seed/seed.module';
import { SeedService } from '../src/database/seed/seed.service';
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/filters';
import { TransformInterceptor } from '../src/interceptors/transform.interceptors';
import { ProductService } from '../src/product/product.service';
import { Product } from '../src/product/product.schema';
import mongoose from 'mongoose';
describe('Product Removed Integration Test', () => {
  let app: INestApplication;
  let productId: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(
      new ValidationPipe({ stopAtFirstError: true, whitelist: true }),
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    // Migrate products into db
    const seedApp = await NestFactory.createApplicationContext(SeedModule);
    await seedApp.get(SeedService).seedProducts();
    const productService = app.get(ProductService);
    const {
      data: [product],
    } = await productService.getProducts({ pageNumber: '1', pageSize: '1' });
    productId = (product as Product & { _id: string })._id;
    await app.init();
  });
  afterAll(async () => {
    await mongoose.connection.close(true);
  });
  describe('/api/v1/removed-products (POST)', () => {
    it('should validate that productId is passed', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/removed-products')
        .expect(400)
        .send();
      expect(response.body.status).toBe('fail');
    });
    it('should successfully add product as a removed item', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/removed-products')
        .expect(201)
        .send({ productIds: [productId] });
      expect(response.body.status).toBe('success');
    }, 12000);
  });

  describe('/api/v1/removed-products (GET)', () => {
    it('should return a paginated list of removed product history', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/removed-products')
        .expect(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('pagination');
      expect(response.body.data.data).toHaveLength(1);
    });
  });
});
