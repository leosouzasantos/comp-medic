import { formatDate } from '../../utils/date'
import { MailtrapProvider } from '../providers/implementations/mail/MailtrapProvider'

export type NoitificationTask = {
  email: string
  date: Date
}

const mailProvider = new MailtrapProvider()

export async function notificiationAppointmentWorker({
  email,
  date,
}: NoitificationTask): Promise<void> {
  await mailProvider.sendEmail({
    to: email,
    from: 'Scheduling a doctor appointment <noreplay@compmedic.com>',
    html: `
      Hello! <br/>
      Don't forget your appointment today ${formatDate(date, 'HH:mm')}`,
    subject: 'Appointment schedule reminder',
  })
}
