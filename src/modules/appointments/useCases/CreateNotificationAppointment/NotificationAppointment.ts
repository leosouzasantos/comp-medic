import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'

export class NotificationAppointment {
  constructor(private appointmentRepository: IAppointmentsRepository) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients()

    return appointments
  }
}
