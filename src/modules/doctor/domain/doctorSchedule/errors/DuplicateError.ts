import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class DuplicateError extends Error implements DomainError {
  constructor() {
    super(`Duplicate Day of Week.`)
    this.name = 'DuplicateError'
  }
}
