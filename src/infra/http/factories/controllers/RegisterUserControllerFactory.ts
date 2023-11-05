import { Controller } from '../../../../core/infra/Controller'
import { PrismaUserRepository } from '../../../../modules/users/repositories/prisma/PrismaUserRepository'
import { UserController } from '../../../../modules/users/useCases/CreateUser/CreateUserController'
import { CreateUser } from '../../../../modules/users/useCases/CreateUser/CreateUserUseCase'

export function makeRegisterUserController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const createUserUseCase = new CreateUser(prismaUserRepository)

  const registerUserController = new UserController(createUserUseCase)

  return registerUserController
}
