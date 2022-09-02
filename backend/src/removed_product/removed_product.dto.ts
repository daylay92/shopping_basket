import {
  IsOptional,
  IsNumberString,
  IsString,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRemovedProductDto {
  @ApiProperty({
    title: 'productIds',
    description:
      'An array of the ID of products removed before checkout for the current user',
  })
  @IsString({
    each: true,
  })
  @ArrayNotEmpty()
  @ArrayUnique()
  productIds: string[];
}

export class GetRemovedProductsDto {
  @IsOptional()
  @IsNumberString()
  pageNumber?: string;

  @IsOptional()
  @IsNumberString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

export class FetchRemovedProductsResponse {
  id: string;
  name: string;
  frequency: number;
}
