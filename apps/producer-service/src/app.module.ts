import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProducerModule } from './modules/producer/producer.module'
import { RabbitmqModule } from './modules/rabbitmq/rabbitmq.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ProducerModule,
    RabbitmqModule
  ]
})
export class AppModule {}
