import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://jibs001:RBMQ0001@johandevserver.space:5672'],
        queue: 'mails_queue',
        queueOptions: {
          durable: false,
        },
      },
    }
  )
  await app.listen()
}

void bootstrap()
