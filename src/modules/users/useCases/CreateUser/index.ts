import { PrismaUserRepository } from '../../repositories/prisma/PrismaUserRepository'
import { CreateUserController } from './CreateUserController'

const prismaUserRepository = new PrismaUserRepository()
const createUserController = new CreateUserController(prismaUserRepository)

export { createUserController }
