import { describe, expect, it } from 'vitest'
import { Name } from './name'
import { Password } from './password'
import { Username } from './username'
import { User } from './user'

const name = Name.create('John Doe').value as Name
const username = Username.create('johndoe@example.com').value as Username
const password = Password.create('123456').value as Password

describe('User model', () => {
  it('should be able to create new user', () => {
    const userOrError = User.create({
      name,
      username,
      password,
    })

    expect(userOrError.isRight()).toBeTruthy()
  })
})
