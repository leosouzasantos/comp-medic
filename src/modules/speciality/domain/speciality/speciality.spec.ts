import { describe, expect, it } from 'vitest'
import { Name } from './name'
import { Description } from './description'
import { Speciality } from './speciality'

const name = Name.create('neurosurgery').value as Name
const description = Description.create('hello world').value as Description

describe('Speciality model', () => {
  it('should be able to create new speciality', () => {
    const specialityOrError = Speciality.create({
      name,
      description,
    })

    expect(specialityOrError.isRight()).toBeTruthy()
  })
})
