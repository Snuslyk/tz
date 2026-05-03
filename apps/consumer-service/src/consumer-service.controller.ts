import { Controller, Logger } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import { TelegramService } from './modules/telegram/telegram.service'

@Controller()
export class ConsumerServiceController {
  private readonly logger = new Logger(ConsumerServiceController.name)

  constructor(private readonly telegramService: TelegramService) {}

  @EventPattern('event-created')
  async handleEventCreated(@Payload() body: object, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const message = ctx.getMessage()

    try {
      await this.telegramService.sendMessage(body)

      channel.ack(message)
      this.logger.log(`processed ${body['uuid']}`)
    } catch (e) {
      this.logger.error(`failed ${body['uuid']}`, e as Error)

      channel.nack(message, false, true)
    }
  }
}
