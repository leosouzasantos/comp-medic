import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider, MailMessage } from '../../models/IMailProvider'

export class MailtrapProvider implements IMailProvider {
  private transporter!: Transporter
  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
          },
        })
        this.transporter = transporter
      })
      .catch((err) => console.log(err))
  }
  async sendEmail(message: MailMessage): Promise<void> {
    const resultMail = await this.transporter.sendMail({
      to: message.to,
      from: message.from,
      subject: message.subject,
      text: message.text,
      html: message.html,
    })

    console.log('Message sent: %s', resultMail.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail))
  }
}
