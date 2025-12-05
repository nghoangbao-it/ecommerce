import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedData } from 'initialScript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000).then(()=> {
    // seedData()
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
bootstrap();
