import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidDoctorError extends Error implements UseCaseError {
  constructor(doctor: string) {
    super(`Doctor "${doctor}" does not exists`)
    this.name = 'InvalidDoctorError'
  }
}
