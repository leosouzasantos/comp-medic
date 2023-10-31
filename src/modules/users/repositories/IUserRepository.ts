import { User } from '../entities/UserEntity'

export interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>
  save(data: User): Promise<User>
}
