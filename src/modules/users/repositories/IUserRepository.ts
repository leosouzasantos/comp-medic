import { User } from '../domain/user/user'

export interface IUserRepository {
  exists(username: string): Promise<boolean>
  findByUsername(username: string): Promise<User>
  //save(user: User): Promise<void>
  create(user: User): Promise<void>
}
