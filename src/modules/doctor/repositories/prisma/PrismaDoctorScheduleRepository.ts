import { prisma } from '../../../../infra/prisma/client'
import { DoctorSchedule } from '../../domain/doctorSchedule/doctorSchedule'
import {
  DoctorScheduleMapper,
  DoctorScheduleWeek,
} from '../../mappers/DoctorSchedulesMapper'
import { IDoctorScheduleRepository } from '../IDoctorScheduleRepository'

export class PrismaDoctorScheduleRepository
  implements IDoctorScheduleRepository
{
  async create(doctorSchedule: DoctorSchedule): Promise<void> {
    const data = DoctorScheduleMapper.toPersistence(doctorSchedule)

    await prisma.$transaction([
      prisma.doctorSchedules.deleteMany({
        where: {
          doctor_id: data.doctorId,
        },
      }),
      prisma.doctorSchedules.create({
        data: {
          doctor_id: data.doctorId,
          start_at: data.startAt,
          end_at: data.endAt,
          day_of_week: data.dayOfWeek,
        },
      }),
    ])
  }

  async findByDoctorIdAndDayOfWeek(
    doctorId: string,
    dayOfWeek: number
  ): Promise<DoctorScheduleWeek | null> {
    const result = await prisma.doctorSchedules.findFirst({
      where: {
        doctor_id: doctorId,
        AND: {
          day_of_week: dayOfWeek,
        },
      },
      include: {
        doctor: {
          include: {
            doctorInfo: true,
          },
        },
      },
    })

    if (result) return DoctorScheduleMapper.prismaToEntity(result)

    return null
  }
}
