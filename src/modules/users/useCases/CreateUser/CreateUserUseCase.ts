import { Either, left, right } from '../../../../core/logic/Either'
import { InvalidNameError } from '../../domain/user/errors/InvalidNameError'
import { InvalidPasswordLengthError } from '../../domain/user/errors/InvalidPasswordLenghtError'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'
import { User } from '../../domain/user/user'
import { IUserRepository } from '../../repositories/IUserRepository'
import { Name } from '../../domain/user/name'
import { Username } from '../../domain/user/username'
import { Password } from '../../domain/user/password'

type UserRequest = {
  name: string
  username: string
  password: string
  isAdmin: false
}

type CreateUserResponse = Either<
  | UserAlreadyExistsError
  | InvalidNameError
  | InvalidNameError
  | InvalidPasswordLengthError,
  User
>

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    username,
    password,
  }: UserRequest): Promise<CreateUserResponse> {
    const nameOrError = Name.create(name)
    const usernameOrError = Username.create(username)
    const passwordOrError = Password.create(password)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const userOrError = User.create({
      name: nameOrError.value,
      username: usernameOrError.value,
      password: passwordOrError.value,
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userAlreadyExists = await this.userRepository.exists(
      user.username.value
    )

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(user.username.value))
    }

    await this.userRepository.create(user)

    return right(user)
  }
}
