import {
  Doctor,
  DoctorInfo,
  DoctorSchedules as PersistenceDoctorSchedule,
} from '@prisma/client'
import { DoctorSchedule } from '../domain/doctorSchedule/doctorSchedule'

export type DoctorScheduleWeek = {
  startAt: string
  endAt: string
  dayOfWeek: number
  doctorId: string
  doctor: {
    DoctorInfo: {
      duration: number
    }
  }
}

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

  static prismaToEntity = (
    schedule: PersistenceDoctorSchedule & {
      doctor: Doctor & { doctorInfo: DoctorInfo | null }
    }
  ): DoctorScheduleWeek => {
    return {
      doctorId: schedule.doctor_id,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      dayOfWeek: schedule.day_of_week,
      doctor: {
        DoctorInfo: {
          duration: schedule.doctor.doctorInfo?.duration || 0,
        },
      },
    }
  }
}
