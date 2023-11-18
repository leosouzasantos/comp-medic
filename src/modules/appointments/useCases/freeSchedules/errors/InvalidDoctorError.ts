import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidDoctorError extends Error implements UseCaseError {
  constructor() {
    super(`Doctor is required.`)
    this.name = 'InvalidDoctorError'
  }
}
