import { PasswordBcrypt } from '../../../../infra/shared/crypto/PasswordBcrypt'
import { PrismaUserRepository } from '../../repositories/prisma/PrismaUserRepository'
import { AuthenticateUserController } from './AuthenticateUserController'

const prismaUserRepository = new PrismaUserRepository()
const passwordBcrypt = new PasswordBcrypt()
const authenticateUserController = new AuthenticateUserController(
  prismaUserRepository,
  passwordBcrypt
)

export { authenticateUserController }
