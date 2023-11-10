import { Either, left, right } from '../../../../core/logic/Either'
import { ISpecialityRepository } from '../../../speciality/repositories/ISpecialityRepository'
import { IUserRepository } from '../../../users/repositories/IUserRepository'
import { Crm } from '../../domain/doctor/crm'
import { Doctor } from '../../domain/doctor/doctor'
import { Email } from '../../domain/doctor/email'
import { InvalidCrmError } from '../../domain/doctor/errors/InvalidCrmError'
import { InvalidEmailError } from '../../domain/doctor/errors/InvalidEmailError'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'
import { CrmAlreadyExistError } from './errors/CrmAlreadyExistsError'
import { EmailAlreadyExistError } from './errors/EmailAlreadyExistsError'
import { InvalidSpecialityError } from './errors/InvalidSpecialityError'
import { InvalidUserError } from './errors/InvalidUserError'

export type DoctorRequest = {
  crm: string
  email: string
  userId: string
  specialityId: string
}

type DoctorResponse = Either<InvalidCrmError | InvalidEmailError, Doctor>

export class CreateDoctor {
  constructor(
    private userRepository: IUserRepository,
    private specialityRepository: ISpecialityRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute({
    crm,
    email,
    userId,
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
      return left(new InvalidSpecialityError())
    }

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new InvalidUserError())
    }

    const doctorOrError = Doctor.create({
      crm: crmOrError.value,
      email: emailOrError.value,
      userId,
      specialityId,
    })

    if (doctorOrError.isLeft()) {
      return left(doctorOrError.value)
    }

    const doctor = doctorOrError.value

    const crmExists = await this.doctorRepository.exists(doctor.crm.value)

    if (crmExists) {
      return left(new CrmAlreadyExistError(doctor.crm.value))
    }

    const emailExist = await this.doctorRepository.exists(doctor.email.value)

    if (emailExist) {
      return left(new EmailAlreadyExistError(doctor.email.value))
    }

    await this.doctorRepository.create(doctor)

    return right(doctor)
  }
}
