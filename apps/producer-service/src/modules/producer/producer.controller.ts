import { Body, Controller, Post } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { ObjectPipe } from '../../pipes/object.pipe'

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('event')
  createEvent(@Body(ObjectPipe) body: object) {
    return this.producerService.addMessageToQueue('event-created', body)
  }
}
