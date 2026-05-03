import { Inject, Injectable } from '@nestjs/common'
import { CONSUMER_SERVICE_RABBITMQ } from '../rabbitmq/rabbitmq.module'
import { ClientProxy } from '@nestjs/microservices'
import { v4 as uuid } from 'uuid'
import { firstValueFrom, retry, timeout } from 'rxjs'

@Injectable()
export class ProducerService {
  constructor(
    @Inject(CONSUMER_SERVICE_RABBITMQ) private readonly client: ClientProxy
  ) {}

  async addMessageToQueue(eventName: string, body: object) {
    const id = uuid()

    await firstValueFrom(
      this.client
        .emit(eventName, { uuid: id, ...body })
        .pipe(timeout(5000), retry({ count: 3, delay: 300 }))
    )

    return {
      message: `event ${id} was sent successfully`,
      body
    }
  }
}
