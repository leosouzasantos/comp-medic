import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidCrmError extends Error implements DomainError {
  constructor(crm: string) {
    super(`The CRM "${crm}" is invalid.`)
    this.name = 'InvalidCrmError'
  }
}
