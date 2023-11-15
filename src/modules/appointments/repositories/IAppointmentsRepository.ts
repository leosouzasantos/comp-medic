import { Appointments } from '../domain/appointments/appointments'

export interface IAppointmentsRepository {
  create(appointments: Appointments): Promise<void>
  findById(id: string): Promise<Appointments | undefined>
}
