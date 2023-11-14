import { DomainError } from '../../../../../core/domain/errors/DomainError'

export class InvalidDocumentError extends Error implements DomainError {
  constructor(document: string) {
    super(`The document "${document}" is invalid.`)
    this.name = 'InvalidDocumentError'
  }
}
