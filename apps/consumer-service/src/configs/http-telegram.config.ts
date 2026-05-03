import { ConfigService } from '@nestjs/config'
import { HttpModuleOptions } from '@nestjs/axios'

export function httpTelegramConfig(
  configService: ConfigService
): HttpModuleOptions {
  return {
    baseURL: configService.getOrThrow<string>('TELEGRAM_BOT_API_URL')
  }
}
