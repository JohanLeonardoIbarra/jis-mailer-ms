import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'

@Controller()
export class MailControllerController {
  @MessagePattern('mail')
  test(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data, context)
  }
}
