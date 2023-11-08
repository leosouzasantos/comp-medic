import { Either, left, right } from '../../../../core/logic/Either'
import { Name } from '../../../users/domain/user/name'
import { Password } from '../../../users/domain/user/password'
import { User } from '../../../users/domain/user/user'
import { Username } from '../../../users/domain/user/username'
import { IUserRepository } from '../../../users/repositories/IUserRepository'
import { UserAlreadyExistsError } from '../../../users/useCases/CreateUser/errors/UserAlreadyExistsError'
import { Crm } from '../../domain/doctor/crm'
import { Doctor } from '../../domain/doctor/doctor'
import { Email } from '../../domain/doctor/email'
import { InvalidCrmError } from '../../domain/doctor/errors/InvalidCrmError'
import { InvalidEmailError } from '../../domain/doctor/errors/InvalidEmailError'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'

export type DoctorRequest = {
  username: string
  name: string
  password: string
  email: string
  crm: string
  specialityId: string
}

type DoctorResponse = Either<InvalidCrmError | InvalidEmailError, Doctor>

export class CreateDoctor {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute(data: DoctorRequest): Promise<DoctorResponse> {
    const nameOrError = Name.create(data.name)
    const usernameOrError = Username.create(data.username)
    const passwordOrError = Password.create(data.password)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const userOrError = User.create({
      name: nameOrError.value,
      username: usernameOrError.value,
      password: passwordOrError.value,
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userAlreadyExists = await this.userRepository.exists(
      user.username.value
    )

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(user.username.value))
    }

    await this.userRepository.create(user)

    //////////////////////////////////////
    const crmOrError = Crm.create(data.crm)
    const emailOrError = Email.create(data.email)

    if (crmOrError.isLeft()) {
      return left(crmOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    //////////////////////////////////

    const doctorOrError = Doctor.create({
      crm: crmOrError.value,
      email: emailOrError.value,
      specialityId: data.specialityId,
      userId: user.id,
    })

    if (doctorOrError.isLeft()) {
      return left(doctorOrError.value)
    }

    const doctor = doctorOrError.value

    await this.doctorRepository.create(doctor)

    return right(doctor)
  }
}
