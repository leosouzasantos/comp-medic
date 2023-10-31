import { User } from '../../entities/UserEntity'
import { ParameterRequiredError } from '../../../../errors/parameterRequiredError'
import { IUserRepository } from '../../repositories/IUserRepository'
import { UserAlreadyExistsError } from '../../../../errors/UserAlreadyExistsError'

type UserRequest = {
  name: string
  username: string
  password: string
  isAdmin: false
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: UserRequest) {
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new ParameterRequiredError('Username/password is required.', 422)
    }

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new UserAlreadyExistsError('Username already exists', 400)
    }

    const userCreated = await this.userRepository.save(user)
    return userCreated
  }
}
