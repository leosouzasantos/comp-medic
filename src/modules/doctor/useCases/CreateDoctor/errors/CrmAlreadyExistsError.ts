import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class CrmAlreadyExistError extends Error implements UseCaseError {
  constructor(crm: string) {
    super(`The CRM "${crm}" is already registered`)
    this.name = 'CrmAlreadyExistError'
  }
}
