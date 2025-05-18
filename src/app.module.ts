import { Module } from '@nestjs/common'
import { MailControllerController } from './controllers'
import { MailService } from './services'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MailControllerController],
  providers: [MailService],
})
export class AppModule {}
