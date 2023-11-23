import { describe, expect, it } from 'vitest'
import { Description } from './description'

describe('Speciality description value object', () => {
  it('should accept valid description', () => {
    const descriptionOrError = Description.create('Hello world!')

    expect(descriptionOrError.isRight()).toBeTruthy()
  })

  it('should reject description less than characters', () => {
    const descriptionOrError = Description.create('h')

    expect(descriptionOrError.isLeft()).toBeTruthy()
  })

  it('should reject description with more than 255 characters', () => {
    const descriptionOrError = Description.create('d'.repeat(260))

    expect(descriptionOrError.isLeft()).toBeTruthy()
  })
})
