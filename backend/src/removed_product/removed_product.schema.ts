import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product } from '../product/product.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class RemovedProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export type RemovedProductDocument = RemovedProduct & Document;

export const RemovedProductSchema =
  SchemaFactory.createForClass(RemovedProduct);
