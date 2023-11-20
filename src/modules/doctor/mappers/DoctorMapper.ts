import {
  Doctor as PersistenceDoctor,
  User as PersistenceUser,
} from '@prisma/client'
import { Doctor } from '../domain/doctor/doctor'
import { Crm } from '../domain/doctor/crm'
import { Email } from '../domain/doctor/email'
import { DoctorWithUserDTO } from '../dtos/DoctorDTO'

export class DoctorMapper {
  static toDomain(raw: PersistenceDoctor): Doctor {
    const crmOrError = Crm.create(raw.crm)
    const emailOrError = Email.create(raw.email)

    if (crmOrError.isLeft()) {
      throw new Error('CRM value is invalid.')
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid')
    }

    const doctorOrError = Doctor.create(
      {
        crm: crmOrError.value,
        email: emailOrError.value,
        specialityId: raw.speciality_id,
        userId: raw.user_id,
      },
      raw.id
    )

    if (doctorOrError.isRight()) {
      return doctorOrError.value
    }

    throw new Error('Error creating Doctor object')
  }

  static toPersistence(doctor: Doctor) {
    return {
      id: doctor.id,
      crm: doctor.crm.value,
      email: doctor.email.value,
      speciality_id: doctor.specialityId,
      user_id: doctor.userId,
    }
  }

  static toDto = (
    data: PersistenceDoctor & { user: PersistenceUser }
  ): DoctorWithUserDTO => {
    return {
      crm: data.crm,
      email: data.email,
      specialityId: data.speciality_id,
      userId: data.user_id,
      id: data.id,
      user: {
        name: data.user.name,
      },
    }
  }
}
