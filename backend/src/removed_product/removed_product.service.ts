import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { PaginatedResponse } from '../types';
import { Product, ProductDocument } from '../product/product.schema';
import { constants } from '../utils';
import {
  CreateRemovedProductDto,
  FetchRemovedProductsResponse,
  GetRemovedProductsDto,
} from './removed_product.dto';
import {
  RemovedProduct,
  RemovedProductDocument,
} from './removed_product.schema';

@Injectable()
export class RemovedProductService {
  constructor(
    @InjectModel(RemovedProduct.name)
    private readonly removedProductModel: Model<RemovedProductDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addRemovedProduct(
    dto: CreateRemovedProductDto,
  ): Promise<RemovedProduct[]> {
    const products = await this.productModel
      .find()
      .where('_id')
      .in(dto.productIds)
      .exec();
    if (!products?.length || products.length !== dto.productIds.length)
      throw new NotFoundException(constants.PRODUCTS_NOT_FOUND);
    const removedProducts = products.map(
      (product) => new this.removedProductModel({ product }),
    );
    await this.removedProductModel.insertMany(removedProducts);
    return removedProducts;
  }

  async getRemovedProducts(
    dto: GetRemovedProductsDto,
  ): Promise<PaginatedResponse<FetchRemovedProductsResponse>> {
    const pageNumber = +(dto?.pageNumber || '1');
    const pageSize = +(dto?.pageSize || '30');
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'Product',
        },
      },
      {
        $unwind: '$Product',
      },
    ];
    if (dto.search)
      pipeline.push({ $match: { 'Product.name': new RegExp(dto.search) } });
    pipeline.push(
      {
        $group: {
          _id: {
            name: '$Product.name',
            _id: '$Product._id',
          },
          frequency: { $sum: 1 },
        },
      },
      {
        $facet: {
          results: [
            { $skip: (pageNumber - 1) * pageSize },
            { $limit: pageSize },
          ],
          total: [
            {
              $count: 'count',
            },
          ],
        },
      },
    );
    const [{ results, total }] = await this.removedProductModel.aggregate(
      pipeline,
    );
    const removedProducts = (
      results as { _id: { _id: string; name: string }; frequency: number }[]
    )?.map((removedProduct) => ({
      id: removedProduct._id._id,
      name: removedProduct._id.name,
      frequency: removedProduct.frequency,
    }));
    return {
      data: removedProducts,
      pagination: {
        total: total[0]?.count || 0,
        pageNumber,
        pageSize,
      },
    };
  }
}
