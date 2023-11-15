import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidSchedulesError extends Error implements DomainError {
  constructor() {
    super('Invalid schedules.')
    this.name = 'InvalidSchedulesError'
  }
}
