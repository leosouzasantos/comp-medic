import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class InvalidUsernameOrPasswordError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Invalid  username/password combination.')
    this.name = 'InvalidUsernameOrPasswordError'
  }
}
