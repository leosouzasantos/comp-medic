import { queueAppointmentNotification } from '../../../../infra/queue/queue'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'

export class NotificationAppointment {
  constructor(private appointmentRepository: IAppointmentsRepository) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients()

    appointments.forEach((appointment) => {
      const email = appointment.patient.email
      const date = appointment.date

      queueAppointmentNotification.push({
        email: email,
        date: date,
      })
    })

    return appointments
  }
}
