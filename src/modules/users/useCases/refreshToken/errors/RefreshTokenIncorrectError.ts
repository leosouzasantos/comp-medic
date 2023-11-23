import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class RefreshTokenIncorrectError extends Error implements UseCaseError {
  constructor() {
    super('Refresh Token incorrect.')
    this.name = 'RefreshTokenIncorrectError'
  }
}
