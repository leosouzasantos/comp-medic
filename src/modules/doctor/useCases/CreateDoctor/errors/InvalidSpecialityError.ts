import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidSpecialityError extends Error implements UseCaseError {
  constructor() {
    super('Speciality does not exists.')
    this.name = 'InvalidSpecialityError'
  }
}
