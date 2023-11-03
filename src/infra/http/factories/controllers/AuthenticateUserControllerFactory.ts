import { Controller } from '../../../../core/infra/Controller'
import { PrismaUserRepository } from '../../../../modules/users/repositories/prisma/PrismaUserRepository'
import { AuthenticateUserController } from '../../../../modules/users/useCases/AuthenticateUser/AuthenticateUserController'
import { AuthenticateUser } from '../../../../modules/users/useCases/AuthenticateUser/AuthenticatecaseUserUseCase'
import { PasswordBcrypt } from '../../../shared/crypto/PasswordBcrypt'

export function makeAuthenticateUserCOntroller(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUser = new AuthenticateUser(prismaUserRepository)
  const authenticateUserController = new AuthenticateUserController(
    authenticateUser
  )

  return authenticateUserController
}
