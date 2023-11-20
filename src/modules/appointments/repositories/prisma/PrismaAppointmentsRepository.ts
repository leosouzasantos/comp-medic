import { prisma } from '../../../../infra/prisma/client'
import { Appointments } from '../../domain/appointments/appointments'
import { AppointmentMapper } from '../../mappers/AppointmentsMapper'
import {
  AppointmentDTO,
  AppointmentsDate,
  IAppointmentsRepository,
} from '../IAppointmentsRepository'

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
  async findAppointmentByDoctorAndDatetime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prisma.$queryRaw`
      SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date}
      and doctor_id = ${doctorId} limit 1
  `
    return result[0]
  }
  async findAppointmentByPatientAndDatetime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate> {
    const result: AppointmentsDate[] = await prisma.$queryRaw`
      SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date}
      and patient_id = ${patientId} limit 1
  `
    return result[0]
  }
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prisma.$queryRaw`
      SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date}
      and doctor_id = ${doctorId}
    `
  }

  async create(appointment: Appointments): Promise<void> {
    const data = AppointmentMapper.toPersistence(appointment)

    await prisma.appointment.create({
      data: {
        doctor_id: data.doctor_Id,
        patient_id: data.patient_Id,
        is_finished: data.is_Finished,
        date: data.date,
        note: data.note,
      },
    })
  }
}
