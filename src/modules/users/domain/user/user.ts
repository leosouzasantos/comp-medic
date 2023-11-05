import { UserEntity } from '../../entities/UserEntity'
import { Either, right } from '../../../../core/logic/Either'
import { InvalidNameError } from './errors/InvalidNameError'
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLenghtError'
import { InvalidUsernameError } from './errors/InvalidUsernameError'
import { Name } from './name'
import { Password } from './password'
import { Username } from './username'

interface IUserProps {
  name: Name
  username: Username
  password: Password
}

export class User extends UserEntity<IUserProps> {
  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get password() {
    return this.props.password
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IUserProps,
    id?: string
  ): Either<
    InvalidNameError | InvalidUsernameError | InvalidPasswordLengthError,
    User
  > {
    const user = new User(props, id)
    return right(user)
  }
}
