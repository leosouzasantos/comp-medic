type UserRequest = {
  name: string
  username: string
  password: string
  isAdmin: false
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    if (!data.username && !data.password) {
      throw new Error('Username/password is required.')
    }
  }
}
