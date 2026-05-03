import { NestFactory } from '@nestjs/core'
import { ConsumerServiceModule } from './consumer-service.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ConsumerServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL as string],
        queue: 'consumer_events',
        noAck: false,
        queueOptions: {
          durable: true
        }
      }
    }
  )
  await app.listen()
}
bootstrap()
