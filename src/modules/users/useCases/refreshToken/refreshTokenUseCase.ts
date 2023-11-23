import { sign, verify } from 'jsonwebtoken'
import { connectionRedis } from '../../../../infra/redis/connection'
import { InvalidTokenError } from './errors/InvalidTokenError'
import { RefreshTokenIncorrectError } from './errors/RefreshTokenIncorrectError'
import { IUserRepository } from '../../repositories/IUserRepository'
import { JWT } from '../../domain/user/jwt'

export class RefreshToken {
  constructor(private userRepository: IUserRepository) {}
  async execute(refreshToken: string) {
    const secretKeyRefreshToken = process.env.SECRET_KEY_REFRESH_TOKEN || ''

    try {
      const { sub } = verify(refreshToken, secretKeyRefreshToken)

      const redisClient = new connectionRedis()
      const refreshTokenRedis = await redisClient.getValue(String(sub))

      if (refreshToken !== refreshTokenRedis) {
        return new RefreshTokenIncorrectError()
      }

      const user = await this.userRepository.findById(String(sub))

      if (!user) {
        throw new Error('User does not exists.')
      }

      const tokenGenerated = JWT.create(user)

      const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || ''

      const newRefreshToken = sign({}, refreshTokenSecret, {
        subject: user.id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      })

      await redisClient.setValue(user.id, newRefreshToken)

      return { token: tokenGenerated, refreshToken: newRefreshToken }
    } catch (err) {
      return new InvalidTokenError()
    }
  }
}
