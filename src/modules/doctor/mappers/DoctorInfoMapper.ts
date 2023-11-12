import { DoctorInfo as PersistenceDoctorInfo } from '@prisma/client'
import { DoctorInfo } from '../domain/doctorInfo/doctorInfo'

export class DoctorInfoMapper {
  static toDomain(raw: PersistenceDoctorInfo): DoctorInfo {
    const doctorOrError = DoctorInfo.create(
      {
        doctorId: raw.doctor_id,
        startAt: raw.start_at,
        endAt: raw.end_at,
        duration: raw.duration,
        price: Number(raw.price),
      },
      raw.id
    )

    if (doctorOrError.isRight()) {
      return doctorOrError.value
    }
    throw new Error('Error creating Doctor info object')
  }

  static toPersistence(doctorInfo: DoctorInfo) {
    return {
      id: doctorInfo.id,
      startAt: doctorInfo.startAt,
      endAt: doctorInfo.endAt,
      duration: doctorInfo.duration,
      price: doctorInfo.price,
      doctorId: doctorInfo.doctorId,
    }
  }
}
