import { DoctorSchedules as PersistenceDoctorSchedule } from '@prisma/client'
import { DoctorSchedule } from '../domain/doctorSchedule/doctorSchedule'

export class DoctorScheduleMapper {
  static toDomain(raw: PersistenceDoctorSchedule): DoctorSchedule {
    const DoctorScheduleOrError = DoctorSchedule.create(
      {
        doctorId: raw.doctor_id,
        startAt: raw.start_at,
        endAt: raw.end_at,
        dayOfWeek: raw.day_of_week,
      },
      raw.id
    )

    if (DoctorScheduleOrError.isRight()) {
      return DoctorScheduleOrError.value
    }
    throw new Error('Error creating Doctor info object')
  }

  static toPersistence(doctorSchedule: DoctorSchedule) {
    return {
      id: doctorSchedule.id,
      startAt: doctorSchedule.startAt,
      endAt: doctorSchedule.endAt,
      doctorId: doctorSchedule.doctorId,
      dayOfWeek: doctorSchedule.dayOfWeek,
    }
  }
}
