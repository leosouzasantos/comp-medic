import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidDateError extends Error implements UseCaseError {
  constructor() {
    super(`You need to select a date.`)
    this.name = 'InvalidDateError'
  }
}
