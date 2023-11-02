import { User } from '../../entities/UserEntity'
import { IUserRepository } from '../../repositories/IUserRepository'
import { AlreadyExistsError } from '../../../../errors/AlreadyExistsError'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/IPasswordCrypto'
import { BadRequest } from '../../../../errors/BadRequest'

type UserRequest = {
  name: string
  username: string
  password: string
  isAdmin: false
}

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute(data: UserRequest) {
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new BadRequest('Username/password is required.', 422)
    }

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new AlreadyExistsError('Username already exists', 400)
    }
    const passwordHashed = await this.passwordCrypto.hash(data.password)
    user.password = passwordHashed
    const userCreated = await this.userRepository.save(user)
    return userCreated
  }
}
