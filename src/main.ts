import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

    const swaggerOptions = new DocumentBuilder()
        .setTitle('EOS - Web Service')
        .setDescription('API Documentation')
        .setVersion('0.0.1')
        .setHost(hostDomain.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath('/api')
        .addBearerAuth('Authorization', 'header')
        .addTag('Technologies', 'Node - NestJs, Rxjs, MongoDB, Swagger, Passport - JWT')
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

    SwaggerModule.setup('/api/docs_eos', app, swaggerDoc, {
        swaggerUrl: `${hostDomain}/api/docs-json`,
        explorer: true,
        swaggerOptions: {
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });

    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    await app.listen(AppModule.port);
}

bootstrap();
