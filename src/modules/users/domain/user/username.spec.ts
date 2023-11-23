import { describe, expect, it } from 'vitest'
import { Username } from './username'

describe('User username value object', () => {
  it('should accept valid username', () => {
    const usernameOrError = Username.create('johndoe')

    expect(usernameOrError.isRight()).toBeTruthy()
  })

  it('should reject username with less than 2 characters', () => {
    const usernameOrError = Username.create('jo')

    expect(usernameOrError.isLeft()).toBeTruthy()
  })
})
