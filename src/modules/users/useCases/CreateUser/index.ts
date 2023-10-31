import { PasswordBcrypt } from '../../../../infra/shared/crypto/PasswordBcrypt'
import { PrismaUserRepository } from '../../repositories/prisma/PrismaUserRepository'
import { CreateUserController } from './CreateUserController'

const prismaUserRepository = new PrismaUserRepository()
const passwordBcrypt = new PasswordBcrypt()
const createUserController = new CreateUserController(
  prismaUserRepository,
  passwordBcrypt
)

export { createUserController }
