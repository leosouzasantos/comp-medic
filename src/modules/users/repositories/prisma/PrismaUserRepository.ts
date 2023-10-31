import { User } from '../../entities/UserEntity'
import { IUserRepository } from '../IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  findByUsername(username: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
  save(data: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
