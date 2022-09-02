import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as products from '../assets/products.json';
import { Product, ProductDocument } from '../../product/product.schema';

@Injectable()
export class SeedService {
  private readonly logger: Logger = new Logger('Seed Service');
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async seedProducts() {
    const options = products.map((product) => ({
      updateOne: {
        filter: { name: product.name },
        update: { $set: product },
        upsert: true,
      },
    }));
    await this.productModel.bulkWrite(options as any);
    this.logger.log('Seeding successfully completed');
  }
}
