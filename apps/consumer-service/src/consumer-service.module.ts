import { Module } from '@nestjs/common'
import { ConsumerServiceController } from './consumer-service.controller'
import { ConfigModule } from '@nestjs/config'
import { TelegramModule } from './modules/telegram/telegram.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TelegramModule
  ],
  controllers: [ConsumerServiceController]
})
export class ConsumerServiceModule {}
