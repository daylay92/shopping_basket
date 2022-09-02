import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetRemovedProductsDecorator } from '../decorators';
import { PaginatedResponse, PaginationResult } from '../types';
import {
  GetRemovedProductsDto,
  CreateRemovedProductDto,
  FetchRemovedProductsResponse,
} from './removed_product.dto';
import { RemovedProduct } from './removed_product.schema';
import { RemovedProductService } from './removed_product.service';

@ApiExtraModels(
  PaginatedResponse,
  FetchRemovedProductsResponse,
  PaginationResult,
)
@ApiTags('Removed Products')
@Controller('/api/v1/removed-products')
export class RemovedProductController {
  constructor(private readonly removedProductService: RemovedProductService) {}

  @GetRemovedProductsDecorator()
  async getRemovedProducts(
    @Query() dto: GetRemovedProductsDto,
  ): Promise<PaginatedResponse<FetchRemovedProductsResponse>> {
    return this.removedProductService.getRemovedProducts(dto);
  }

  @Post()
  @HttpCode(201)
  async addRemovedProducts(
    @Body() dto: CreateRemovedProductDto,
  ): Promise<RemovedProduct[]> {
    return this.removedProductService.addRemovedProduct(dto);
  }
}
