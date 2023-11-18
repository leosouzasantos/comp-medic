import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class DoctorNotAvailableError extends Error implements UseCaseError {
  constructor() {
    super(`Doctor does not attend that day.`)
    this.name = 'DoctorNotAvailableError'
  }
}
