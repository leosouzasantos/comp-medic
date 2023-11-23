import { sign } from 'jsonwebtoken'
import { Either, left, right } from '../../../../core/logic/Either'
import { JWT } from '../../domain/user/jwt'

import { IUserRepository } from '../../repositories/IUserRepository'
import { InvalidUsernameOrPasswordError } from './errors/InvalidUsernameOrPasswordError'

type TokenResponse = {
  token: string
  refreshToken: string
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

    const isPasswordValid = await user.password.comparePassword(password)

    if (isPasswordValid === false) {
      return left(new InvalidUsernameOrPasswordError())
    }

    const { token } = JWT.create(user)

    const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || ''

    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    })

    return right({ token, refreshToken })
  }
}
