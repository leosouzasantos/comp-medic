import {
  Patient as PersistencePatient,
  User as PersistenceUser,
} from '@prisma/client'
import { Email } from '../domain/patient/email'
import { Document } from '../domain/patient/document'
import { Patient } from '../domain/patient/patients'
import { PatientWithUserDTO } from '../dtos/patientDTO'

export class PatientMapper {
  static toDomain(raw: PersistencePatient): Patient {
    const emailOrError = Email.create(raw.email)
    const documentOrError = Document.create(raw.document)

    if (documentOrError.isLeft()) {
      throw new Error('Document value is invalid.')
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid')
    }

    const patientOrError = Patient.create(
      {
        email: emailOrError.value,
        document: documentOrError.value,
        userId: raw.user_id,
      },
      raw.id
    )

    if (patientOrError.isRight()) {
      return patientOrError.value
    }

    throw new Error('Error creating Doctor object')
  }

  static toPersistence(patient: Patient) {
    return {
      id: patient.id,
      email: patient.email.value,
      document: patient.document.value,
      user_id: patient.userId,
    }
  }

  static toDto = (
    data: PersistencePatient & { user: PersistenceUser }
  ): PatientWithUserDTO => {
    return {
      id: data.id,
      email: data.email,
      document: data.document,
      userId: data.user_id,
      user: {
        name: data.user.name,
      },
    }
  }
}
