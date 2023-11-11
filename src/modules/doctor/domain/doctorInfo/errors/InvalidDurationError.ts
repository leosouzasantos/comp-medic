import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidDurationError extends Error implements DomainError {
  constructor(duration: number) {
    super(`The duration '${duration}' is invalid.`)
    this.name = 'InvalidDurationError'
  }
}
