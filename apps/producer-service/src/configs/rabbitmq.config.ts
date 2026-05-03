import { ClientProvider, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

export function rabbitmqConfig(configService: ConfigService): ClientProvider {
  const url = configService.getOrThrow<string>('RABBITMQ_URL')

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: 'consumer_events',
      queueOptions: {
        durable: true
      }
    }
  }
}
