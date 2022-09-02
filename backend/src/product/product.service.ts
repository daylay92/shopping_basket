import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResponse } from '../types';
import { GetProductsDto } from './product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getProducts(
    dto: GetProductsDto,
  ): Promise<PaginatedResponse<Partial<Product>>> {
    const pageNumber = +(dto?.pageNumber || '1');
    const pageSize = +(dto?.pageSize || '30');
    const query = this.productModel.find(
      dto.search ? { name: new RegExp(dto.search) } : {},
    );
    let products: Product[] = [];
    // Get count
    const total = await query.clone().count();
    const pagination = {
      pageNumber,
      pageSize,
      total,
    };
    if (total) {
      products = await query
        .select('id name price imageUrl createdAt updateAt')
        .sort('name')
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
    }
    return {
      pagination,
      data: products,
    };
  }
}
