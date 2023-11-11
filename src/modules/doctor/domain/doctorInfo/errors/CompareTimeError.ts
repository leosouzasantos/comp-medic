import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class CompareTimeError extends Error implements DomainError {
  constructor() {
    super(`End time cannot be earlier than start time.`)
    this.name = 'CompareTimeError'
  }
}
