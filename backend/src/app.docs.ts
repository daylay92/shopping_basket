import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Shopping basket APIs')
    .setDescription(
      'A collection of API Endpoints for the shopping basket backend.',
    )
    .setVersion('1.0')
    .addTag(
      'Removed Products',
      'Endpoints for interacting with removed products',
    )
    .addTag('Products', 'Endpoints for interacting with products')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
