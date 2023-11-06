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
      throw new Error('Error creating User object')
    }
    return UserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({ data })
  }
}
