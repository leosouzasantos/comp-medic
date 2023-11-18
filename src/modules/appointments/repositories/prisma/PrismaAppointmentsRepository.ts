import { prisma } from '../../../../infra/prisma/client'
import {
  AppointmentsDate,
  IAppointmentsRepository,
} from '../IAppointmentsRepository'

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prisma.$queryRaw`
      SELECT ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date}
      and doctor_id = ${doctorId}
    `
  }
}
