import cron from 'node-cron'
import { NotificationAppointment } from '../../modules/appointments/useCases/CreateNotificationAppointment/NotificationAppointment'
import { PrismaAppointmentsRepository } from '../../modules/appointments/repositories/prisma/PrismaAppointmentsRepository'

cron.schedule('*/15 * * * * *', async () => {
  const appointmentRepository = new PrismaAppointmentsRepository()
  const notificiationAppointment = new NotificationAppointment(
    appointmentRepository
  )
  const result = await notificiationAppointment.execute()
  console.log(result)
})
