import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import configuration from './config';
import { ProductModule } from './product/product.module';
import { RemovedProductModule } from './removed_product/removed_product.module';
import getDBModuleOptions from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(getDBModuleOptions()),
    ProductModule,
    RemovedProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
