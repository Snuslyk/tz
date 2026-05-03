import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

type EventBody = {
  uuid: string
  [key: string]: any
}

export let chatId: number

@Injectable()
export class TelegramService {
  constructor(private readonly httpService: HttpService) {}

  async updateChatId() {
    const res = await firstValueFrom(this.httpService.get('/getUpdates'))

    for (const update of res.data.result) {
      const text = update.message?.text as string

      if (text === '/start') {
        chatId = update.message.chat.id as number
      }
    }
  }

  async sendMessage(body: object) {
    await this.updateChatId()

    const { uuid, ...rest } = body as EventBody

    const extra = Object.entries(rest)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')

    const text = `UUID: ${uuid}\n` + (extra ? `\nДанные:\n${extra}` : '')

    await firstValueFrom(
      this.httpService.post('/sendMessage', {
        chat_id: chatId,
        text: text
      })
    )
  }
}
