import { User } from '../../entities/UserEntity'
import { ParameterRequiredError } from '../../../../errors/parameterRequiredError'
import { IUserRepository } from '../../repositories/IUserRepository'

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
      throw new ParameterRequiredError('Username/password is required.')
    }

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new ParameterRequiredError('Username already exists')
    }

    const userCreated = await this.userRepository.save(user)
    return userCreated
  }
}
