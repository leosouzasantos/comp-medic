import { User } from '../../domain/user/user'
import { IUserRepository } from '../IUserRepository'

export class InMemoryUserRepository implements IUserRepository {
  constructor(public items: User[] = []) {}

  async exists(username: string): Promise<boolean> {
    return this.items.some((user) => user.username.value === username)
  }
  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.items.find((user) => user.username.value === username)
  }

  async findById(id: string): Promise<User | undefined> {
    return this.items.find((user) => user.id === id)
  }
}
