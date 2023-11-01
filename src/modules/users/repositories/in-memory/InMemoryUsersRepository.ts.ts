import { User } from '../../entities/UserEntity'
import { IUserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  users: User[] = []

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  async save(data: User) {
    this.users.push(data)
    return data
  }
}
