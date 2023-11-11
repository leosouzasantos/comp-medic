import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class UserAlreadyRegisteredError extends Error implements UseCaseError {
  constructor() {
    super(`User already registered.`)
    this.name = 'InvalidUserError'
  }
}
