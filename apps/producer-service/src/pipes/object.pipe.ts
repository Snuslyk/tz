import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ObjectPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new BadRequestException('body should be an object')
    }
    return value
  }
}
