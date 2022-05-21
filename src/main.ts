import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer, Server, server } from 'spdy';
import ServerOptions = server.ServerOptions;
import { readFileSync } from 'fs';

async function bootstrap() {
  const expressApp = express();

  const spdyOpts: ServerOptions = {
    key: readFileSync('./cert/test.key'),
    cert: readFileSync('./cert/test.crt'),
  };

  const server: Server = createServer(spdyOpts, expressApp);

  const app: NestApplication = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors();

  await app.init();
  await server.listen(3000);
}

bootstrap();
