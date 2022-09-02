import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../product/product.schema';
import configuration from '../../config';
import getDBModuleOptions from '../';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forRootAsync(getDBModuleOptions()),
  ],
  providers: [SeedService],
})
export class SeedModule {}
