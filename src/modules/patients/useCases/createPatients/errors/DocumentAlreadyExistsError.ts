import { UseCaseError } from '../../../../../core/domain/errors/UseCaseError'

export class DocumentAlreadyExistsError extends Error implements UseCaseError {
  constructor(document: string) {
    super(`The document "${document}" is already registered`)
    this.name = 'DocumentAlreadyExistsError'
  }
}
