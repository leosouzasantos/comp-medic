import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class UserDocAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`User already exists.`)
    this.name = 'UserDocAlreadyExistsError'
  }
}
