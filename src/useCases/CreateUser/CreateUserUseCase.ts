import { UserRepository } from '../../repositories/UserRepository'
import { User } from '../../entities/UserEntity'
type UserRequest = {
  name: string
  username: string
  password: string
  isAdmin: false
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = new UserRepository()
    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new Error('Username/password is required.')
    }

    const existUser = await userRepository.findByUsername(data.username)

    if (existUser) {
      throw new Error('Username already exists')
    }

    const userCreated = await userRepository.save(user)
    return userCreated
  }
}
