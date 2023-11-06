import { User } from '../domain/user/user'

export interface IUserRepository {
  exists(username: string): Promise<boolean>
  findByUsername(username: string): Promise<User>
  create(user: User): Promise<void>
}
