import { Appointments } from '../domain/appointments/appointments'

export type AppointmentsDate = {
  date: Date
}

export type AppointmentDTO = {
  date: string
}

export interface IAppointmentsRepository {
  create(appointment: Appointments): Promise<void>

  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>

  findAppointmentByDoctorAndDatetime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null>

  findAppointmentByPatientAndDatetime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate>
}
