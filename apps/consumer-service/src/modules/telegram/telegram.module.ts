import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { HttpModule } from '@nestjs/axios'
import { httpTelegramConfig } from '../../configs/http-telegram.config'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: httpTelegramConfig,
      inject: [ConfigService]
    })
  ],
  providers: [TelegramService],
  exports: [TelegramService]
})
export class TelegramModule {}
