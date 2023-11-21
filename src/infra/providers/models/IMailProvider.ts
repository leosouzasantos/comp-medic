export interface MailMessage {
  from: string
  to: string
  text?: string
  html?: string
  subject: string
}

export interface IMailProvider {
  sendEmail(message: MailMessage): Promise<void>
}
