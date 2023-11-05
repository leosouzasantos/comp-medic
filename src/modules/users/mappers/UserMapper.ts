import { User as PersistenceUser } from '@prisma/client'

import { Name } from '../domain/user/name'
import { Username } from '../domain/user/username'
import { Password } from '../domain/user/password'
import { User } from '../domain/user/user'

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const nameOrError = Name.create(raw.name)
    const usernameOrError = Username.create(raw.username)
    const passwordOrError = Password.create(raw.password, true)

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.')
    }

    if (usernameOrError.isLeft()) {
      throw new Error('Email value is invalid.')
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.')
    }

    const userOrError = User.create(
      {
        name: nameOrError.value,
        username: usernameOrError.value,
        password: passwordOrError.value,
      },
      raw.id
    )
    if (userOrError.isRight()) {
      return userOrError.value
    }
    throw new Error('Error creating User object')
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      username: user.username.value,
      password: await user.password.getHashedValue(),
    }
  }
}
