import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { rabbitmqConfig } from '../../configs/rabbitmq.config'
import { ConfigService } from '@nestjs/config'

export const CONSUMER_SERVICE_RABBITMQ = 'rabbitMQ_consumer_service'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CONSUMER_SERVICE_RABBITMQ,
        useFactory: rabbitmqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  exports: [ClientsModule]
})
export class RabbitmqModule {}
