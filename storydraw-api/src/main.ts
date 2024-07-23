import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GqlExceptionFilter } from './common/filters/gql-exception.filter';
import { validationOptions } from './configs/validation.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.useGlobalPipes(new ValidationPipe(validationOptions));

	app.useGlobalFilters(new GqlExceptionFilter());

	await app.listen(3000);
}
bootstrap();
