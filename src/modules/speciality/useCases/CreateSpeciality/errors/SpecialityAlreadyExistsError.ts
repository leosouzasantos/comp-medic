import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class SpecialityAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(name: string) {
    super(`The name "${name}" is already registered.`)
    this.name = 'SpecialityAlreadyExistsError'
  }
}
