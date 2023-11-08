import { Either, left, right } from '../../../../core/logic/Either'
import { InvalidCrmError } from './errors/InvalidCrmError'

export class Crm {
  private readonly crm: string

  get value(): string {
    return this.crm
  }

  private constructor(crm: string) {
    this.crm = crm
  }

  static validate(crm: string): boolean {
    if (!crm || crm.trim().length > 255) {
      return false
    }

    const regex = /^\d{6}$/

    if (!regex.test(crm)) {
      return false
    }

    return true
  }

  static create(crm: string): Either<InvalidCrmError, Crm> {
    if (!this.validate(crm)) {
      return left(new InvalidCrmError(crm))
    }

    return right(new Crm(crm))
  }
}
