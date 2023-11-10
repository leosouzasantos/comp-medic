import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class EmailAlreadyExistError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`The email "${email}" is already registered`)
    this.name = 'EmailAlreadyExistError'
  }
}
