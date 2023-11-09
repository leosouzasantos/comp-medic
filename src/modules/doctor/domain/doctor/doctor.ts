import { Either, right } from '../../../../core/logic/Either'
import { DoctorEntity } from '../../entities/DoctorEntity'
import { Crm } from './crm'
import { Email } from './email'
import { InvalidCrmError } from './errors/InvalidCrmError'
import { InvalidEmailError } from './errors/InvalidEmailError'

interface IDoctorProps {
  crm: Crm
  email: Email
  userId: string
  specialityId: string
}

export class Doctor extends DoctorEntity<IDoctorProps> {
  static id: string

  get crm() {
    return this.props.crm
  }

  get email() {
    return this.props.crm
  }

  get userId() {
    return this.props.userId
  }

  get specialityId() {
    return this.props.specialityId
  }

  private constructor(props: IDoctorProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IDoctorProps,
    id?: string
  ): Either<InvalidCrmError | InvalidEmailError, Doctor> {
    const doctor = new Doctor(props, id)
    return right(doctor)
  }
}
