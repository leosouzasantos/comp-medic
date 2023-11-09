import { Either, left, right } from '../../../../core/logic/Either'

import { ISpecialityRepository } from '../../../speciality/repositories/ISpecialityRepository'
import { IUserRepository } from '../../../users/repositories/IUserRepository'

import { Crm } from '../../domain/doctor/crm'
import { Doctor } from '../../domain/doctor/doctor'
import { Email } from '../../domain/doctor/email'
import { InvalidCrmError } from '../../domain/doctor/errors/InvalidCrmError'
import { InvalidEmailError } from '../../domain/doctor/errors/InvalidEmailError'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'
import { SpecialityNotExistsError } from './errors/SpecialityNotExistsError'
import { UserDocAlreadyExistsError } from './errors/UserDocAlreadyExistsError'

export type DoctorRequest = {
  email: string
  crm: string
  specialityId: string
  userId: string
}

type DoctorResponse = Either<InvalidCrmError | InvalidEmailError, Doctor>

export class CreateDoctor {
  constructor(
    private userRepository: IUserRepository,
    private specialityRepository: ISpecialityRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute({
    userId,
    email,
    crm,
    specialityId,
  }: DoctorRequest): Promise<DoctorResponse> {
    const crmOrError = Crm.create(crm)
    const emailOrError = Email.create(email)

    if (crmOrError.isLeft()) {
      return left(crmOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const speciality = await this.specialityRepository.findById(specialityId)

    if (!speciality) {
      return left(new SpecialityNotExistsError())
    }

    const user = await this.userRepository.findById(userId)

    if (user) {
      return left(new UserDocAlreadyExistsError())
    }

    const doctorOrError = Doctor.create({
      crm: crmOrError.value,
      email: emailOrError.value,
      specialityId: speciality.id,
      userId,
    })

    if (doctorOrError.isLeft()) {
      return left(doctorOrError.value)
    }

    const doctor = doctorOrError.value

    return right(doctor)
  }
}
