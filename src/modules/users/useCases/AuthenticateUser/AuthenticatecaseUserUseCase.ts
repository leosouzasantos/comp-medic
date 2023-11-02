import { BadRequest } from '../../../../errors/BadRequest'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/IPasswordCrypto'
import { IUserRepository } from '../../repositories/IUserRepository'

type AuthenticateRequest = {
  username: string
  password: string
}

export class AuthenticateUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new BadRequest('User does not exist', 401)
    }

    if (!username || !password) {
      throw new BadRequest('Username/password incorrect', 401)
    }

    const comparePassword = await this.passwordCrypto.compare(
      password,
      user.password
    )

    if (!comparePassword) {
      throw new BadRequest('Password incorrect', 401)
    }
    return user
  }
}
