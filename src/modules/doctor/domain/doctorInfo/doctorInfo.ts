import { Entity } from '../../../../core/domain/Entity'
import { Either, left, right } from '../../../../core/logic/Either'

import { InvalidDurationError } from './errors/InvalidDurationError'

interface IDoctorInfoProps {
  price: number
  duration: number
  doctorId: string
}

export class DoctorInfo extends Entity<IDoctorInfoProps> {
  get price() {
    return this.props.price
  }
  get duration() {
    return this.props.duration
  }

  get doctorId() {
    return this.props.doctorId
  }

  private constructor(props: IDoctorInfoProps, id?: string) {
    super(props, id)

    if (props.duration <= 0) {
      left(new InvalidDurationError(props.duration))
    }
  }

  static create(
    props: IDoctorInfoProps,
    id?: string
  ): Either<InvalidDurationError, DoctorInfo> {
    const doctorInfo = new DoctorInfo(props, id)
    return right(doctorInfo)
  }
}
