import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidDoctorError extends Error implements UseCaseError {
  constructor() {
    super(`Doctor does not exists.`)
    this.name = 'InvalidDoctorError'
  }
}
