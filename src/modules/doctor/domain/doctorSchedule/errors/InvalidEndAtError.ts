import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidEndAtError extends Error implements DomainError {
  constructor() {
    super(`Invalid EndAt.`)
    this.name = 'InvalidEndAtError'
  }
}
