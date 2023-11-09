import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class SpecialityNotExistsError extends Error implements UseCaseError {
  constructor() {
    super('CRM does not exists.')
    this.name = 'SpecialityNotExistsError'
  }
}
