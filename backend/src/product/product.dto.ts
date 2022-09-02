import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
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
