/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('E-SHOP')
		.setVersion('1.0')
		.addTag('eshop')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	const urlSwaggerHome = 'api';
	SwaggerModule.setup(urlSwaggerHome, app, document);

	const globalPrefix = '';
	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(new ValidationPipe());
	const port = process.env.PORT || 3000;

	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}${
			globalPrefix ? '/' + globalPrefix : ''
		}/${urlSwaggerHome}`
	);
}

bootstrap();
