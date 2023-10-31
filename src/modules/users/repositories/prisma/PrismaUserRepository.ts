import { prisma } from '../../../../infra/prisma/client'
import { User } from '../../entities/UserEntity'
import { IUserRepository } from '../IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { username },
    })
    return user || undefined
  }
  async save(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
      },
    })
    return user
  }
}
