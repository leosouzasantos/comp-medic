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

  async findByUsername(username: string): Promise<User> {
    const foundUser = this.items.find(
      (user) => user.username.value === username
    )
    if (foundUser) {
      return foundUser
    } else {
      throw new Error('User not found')
    }
  }
}
