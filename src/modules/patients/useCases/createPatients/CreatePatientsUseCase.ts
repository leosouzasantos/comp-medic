import { Either, left, right } from '../../../../core/logic/Either'
import { IUserRepository } from '../../../users/repositories/IUserRepository'
import { Document } from '../../domain/patient/document'
import { Email } from '../../domain/patient/email'
import { Patient } from '../../domain/patient/patients'
import { IPatientsRepository } from '../../repositories/IPatientsRepository'
import { DocumentAlreadyExistsError } from './errors/DocumentAlreadyExistsError'
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError'
import { InvalidDocumentError } from './errors/InvalidDocumentError'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidUserError } from './errors/InvalidUserError'

type PatientRequest = {
  email: string
  document: string
  userId: string
}

type PatientResponse = Either<InvalidEmailError | InvalidDocumentError, Patient>

export class CreatePatient {
  constructor(
    private userRepostiroy: IUserRepository,
    private patientRepository: IPatientsRepository
  ) {}

  async execute({
    email,
    document,
    userId,
  }: PatientRequest): Promise<PatientResponse> {
    const emailOrError = Email.create(email)
    const documentOrError = Document.create(document)

    if (documentOrError.isLeft()) {
      return left(documentOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const user = await this.userRepostiroy.findById(userId)

    if (!user) {
      return left(new InvalidUserError())
    }

    const patientOrError = Patient.create({
      email: emailOrError.value,
      document: documentOrError.value,
      userId,
    })

    if (patientOrError.isLeft()) {
      return left(patientOrError.value)
    }

    const patient = patientOrError.value

    const documentExists = await this.patientRepository.findByDocument(
      patient.document.value
    )

    if (documentExists) {
      return left(new DocumentAlreadyExistsError(patient.document.value))
    }

    const emailExists = await this.patientRepository.findByEmail(
      patient.email.value
    )

    if (emailExists) {
      return left(new EmailAlreadyExistsError(patient.email.value))
    }

    await this.patientRepository.create(patient)

    return right(patient)
  }
}
