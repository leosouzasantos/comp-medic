import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidAppointmentError extends Error implements UseCaseError {
  constructor() {
    super('There is already an appointment for this time.')
    this.name = 'InvalidAppointmentError'
  }
}
