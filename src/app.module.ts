import { Module } from '@nestjs/common'
import { MailControllerController } from './controllers/mail-controller/mail-controller.controller'

@Module({
  imports: [],
  controllers: [MailControllerController],
  providers: [],
})
export class AppModule {}
