import { Either, left, right } from '../../../../core/logic/Either'
import { JWT } from '../../domain/user/jwt'

import { IUserRepository } from '../../repositories/IUserRepository'
import { InvalidUsernameOrPasswordError } from './errors/InvalidUsernameOrPasswordError'

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  username: string
  password: string
}

type AuthenticateUserResponse = Either<
  InvalidUsernameOrPasswordError,
  TokenResponse
>

export class AuthenticateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      return left(new InvalidUsernameOrPasswordError())
    }

    const { token } = JWT.create(user)

    return right({ token })
  }
}
