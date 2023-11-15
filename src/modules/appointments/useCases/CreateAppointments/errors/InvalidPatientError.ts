import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidPatientError extends Error implements UseCaseError {
  constructor() {
    super(`Patient does not exists.`)
    this.name = 'InvalidPatientError'
  }
}
