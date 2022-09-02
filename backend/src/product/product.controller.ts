import { Controller, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetProductsDecorator } from '../decorators';
import { PaginatedResponse, PaginationResult } from '../types';
import { GetProductsDto } from './product.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@ApiExtraModels(PaginatedResponse, PaginationResult)
@ApiTags('Products')
@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GetProductsDecorator()
  getProducts(
    @Query() dto: GetProductsDto,
  ): Promise<PaginatedResponse<Partial<Product>>> {
    return this.productService.getProducts(dto);
  }
}
