// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common'
import { createTransport, Transporter } from 'nodemailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  private transporter: Transporter

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string
  ) {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log('Message sent: %s', new Date())
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
}
