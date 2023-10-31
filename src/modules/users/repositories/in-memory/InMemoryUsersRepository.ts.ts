import { User } from '../../entities/UserEntity'
import { IUserRepository } from '../IUserRepository'

export class ImMemoryUserRepository implements IUserRepository {
  users: User[]

  private static instance: ImMemoryUserRepository

  constructor() {
    this.users = []
  }
  static getInstance() {
    if (!ImMemoryUserRepository.instance) {
      ImMemoryUserRepository.instance = new ImMemoryUserRepository()
    }
    return ImMemoryUserRepository.instance
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  async save(data: User) {
    this.users.push(data)
    return data
  }
}
