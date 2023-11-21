import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider, MailMessage } from '../../models/IMailProvider'

export class MailtrapProvider implements IMailProvider {
  private transporter!: Transporter
  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transport = nodemailer.createTransport({
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
          },
        })
        this.transporter = transport
      })
      .catch((err) => console.log(err))
  }
  async sendEmail(message: MailMessage): Promise<void> {
    const resultMail = await this.transporter.sendMail({
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      subject: message.subject,
      html: message.body,
    })

    console.log('Message sent: %s', resultMail.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail))
  }
}
