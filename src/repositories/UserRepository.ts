import { User } from '../entities/UserEntity'

export class UserRepository {
  users: User[] = []

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  async save(data: User) {
    this.users.push(data)
    return data
  }
}
