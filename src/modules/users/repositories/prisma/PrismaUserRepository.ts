import { prisma } from '../../../../infra/prisma/client'
import { User } from '../../domain/user/user'
import { UserMapper } from '../../mappers/UserMapper'
import { IUserRepository } from '../IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  async exists(username: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: { username },
    })

    return !!userExists
  }

  async findByUsername(username: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error('Error when fetching User object')
    }
    return UserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new Error('Error when searching for user id')
    }

    return UserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({ data })
  }
}
