import { Entity } from '../../../core/domain/Entity'
import { Either, right } from '../../../core/logic/Either'
import { Email } from './email'
import { InvalidDocumentError } from './errors/InvalidDocumentError'
import { InvalidEmailError } from './errors/InvalidEmailError'

interface IPatientsProps {
  email: Email
  document: Document
  userId: string
}

export class Patient extends Entity<IPatientsProps> {
  static id: string

  get email() {
    return this.props.email
  }

  get document() {
    return this.props.email
  }

  get userId() {
    return this.props.userId
  }

  private constructor(props: IPatientsProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IPatientsProps,
    id?: string
  ): Either<InvalidDocumentError | InvalidEmailError, Patient> {
    const patient = new Patient(props, id)
    return right(patient)
  }
}
