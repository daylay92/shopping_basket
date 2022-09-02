import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, set: (v: number) => Math.round(v * 100) / 100 })
  price: number;

  @Prop({ required: true })
  imageUrl: string;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
