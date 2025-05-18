import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Mail } from '../../types'
import { MailService } from '../../services'

@Controller()
export class MailControllerController {
  constructor(private MailService: MailService) {}

  @MessagePattern('mail')
  test(@Payload() data: Mail) {
    void this.MailService.sendMail(
      data.from,
      data.to,
      data.subject,
      data.text,
      data.html
    )
  }
}
