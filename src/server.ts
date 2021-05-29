import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@app/commons/filters/all-exception.filter';
import { ValidationPipe } from '@app/commons/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new AllExceptionFilter());
    app.enableCors();

    if (process.env.APP_ENV !== 'prod') {
        const document = SwaggerModule.createDocument(app, new DocumentBuilder()
            .setTitle('Rate API')
            .setDescription('My rate API')
            .build());

        SwaggerModule.setup('api/doc', app, document);
    }

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(process.env.APP_PORT);
}

bootstrap();
