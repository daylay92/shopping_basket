import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/product.schema';
import { RemovedProductController } from './removed_product.controller';
import { RemovedProduct, RemovedProductSchema } from './removed_product.schema';
import { RemovedProductService } from './removed_product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RemovedProduct.name, schema: RemovedProductSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [RemovedProductService],
  controllers: [RemovedProductController],
})
export class RemovedProductModule {}
