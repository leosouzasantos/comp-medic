import { prisma } from '../../../../infra/prisma/client'
import { DoctorSchedule } from '../../domain/doctorSchedule/doctorSchedule'
import { DoctorScheduleMapper } from '../../mappers/DoctorSchedulesMapper'
import { IDoctorScheduleRepository } from '../IDoctorScheduleRepository'

export class PrismaDoctorScheduleRepository
  implements IDoctorScheduleRepository
{
  async create(doctorSchedule: DoctorSchedule): Promise<void> {
    const data = DoctorScheduleMapper.toPersistence(doctorSchedule)

    await prisma.doctorSchedules.create({
      data: {
        doctor_id: data.doctorId,
        start_at: data.startAt,
        end_at: data.endAt,
        day_of_week: data.dayOfWeek,
      },
    })
  }
}
