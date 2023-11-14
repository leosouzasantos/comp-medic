import { Either, left, right } from '../../../core/logic/Either'
import { InvalidDocumentError } from './errors/InvalidDocumentError'

export class Document {
  private readonly document: string

  get value(): string {
    return this.document
  }

  private constructor(document: string) {
    this.document = document
  }

  static validate(document: string): boolean {
    if (!document || document.trim().length > 255) {
      return false
    }

    const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/

    if (!regex.test(document)) {
      return false
    }

    return true
  }

  static create(document: string): Either<InvalidDocumentError, Document> {
    if (!this.validate(document)) {
      return left(new InvalidDocumentError(document))
    }

    return right(new Document(document))
  }
}
