import { Controller } from '../../../../core/infra/Controller'
import { PrismaUserRepository } from '../../../../modules/users/repositories/prisma/PrismaUserRepository'
import { RefreshTokenController } from '../../../../modules/users/useCases/refreshToken/refreshTokenController'
import { RefreshToken } from '../../../../modules/users/useCases/refreshToken/refreshTokenUseCase'

export function makeRefreshTokeController(): Controller {
  const userRepository = new PrismaUserRepository()

  const refreshTokenUseCase = new RefreshToken(userRepository)
  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)
  return refreshTokenController
}
