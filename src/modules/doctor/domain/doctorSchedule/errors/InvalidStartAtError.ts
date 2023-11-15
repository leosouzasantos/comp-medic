import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidStartAtError extends Error implements DomainError {
  constructor() {
    super(`Invalid StartAt.`)
    this.name = 'InvalidStartAtError'
  }
}
