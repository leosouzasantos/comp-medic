import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidTokenError extends Error implements UseCaseError {
  constructor() {
    super('Token incorrect.')
    this.name = 'InvalidTokenError'
  }
}
