import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { apiReference } from '@scalar/nestjs-api-reference'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('TZ')
    .setDescription('test task')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/docs',
    apiReference({
      content: document
    })
  )

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
