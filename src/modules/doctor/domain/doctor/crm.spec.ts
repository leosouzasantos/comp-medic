import { describe, expect, it } from 'vitest'
import { Crm } from './crm'

describe('Doctor CRM value object', () => {
  it('should accept valid CRM document', () => {
    const crmOrError = Crm.create('123.456')

    expect(crmOrError.isRight()).toBeTruthy
  })

  it('should reject invalid CRM document', () => {
    const crmOrError1 = Crm.create('12345')
    const crmOrError2 = Crm.create('1234567')
    const crmOrError3 = Crm.create('123E56')

    expect(crmOrError1.isLeft()).toBeTruthy
    expect(crmOrError2.isLeft()).toBeTruthy
    expect(crmOrError3.isLeft()).toBeTruthy
  })
})
