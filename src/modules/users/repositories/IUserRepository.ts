import { User } from '../domain/user/user'

export interface IUserRepository {
  exists(username: string): Promise<boolean>
  findByUsername(username: string): Promise<User | undefined>
  create(user: User): Promise<void>
  findById(id: string): Promise<User | undefined>
}
