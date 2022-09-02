import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponse } from '../types';
import { FetchRemovedProductsResponse } from '../removed_product/removed_product.dto';
import { Product } from '../product/product.schema';

export const GetRemovedProductsDecorator = (): any => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(FetchRemovedProductsResponse) },
              },
              pagination: {
                type: 'object',
                properties: {
                  total: {
                    type: 'number',
                  },
                  pageSize: {
                    type: 'number',
                  },
                  pageNumber: {
                    type: 'number',
                  },
                },
              },
            },
          },
        ],
      },
    }),
    Get(),
  );
};

export const GetProductsDecorator = (): any => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(Product) },
              },
              pagination: {
                type: 'object',
                properties: {
                  total: {
                    type: 'number',
                  },
                  pageSize: {
                    type: 'number',
                  },
                  pageNumber: {
                    type: 'number',
                  },
                },
              },
            },
          },
        ],
      },
    }),
    Get(),
  );
};
