import { Entity } from '../../../../core/domain/Entity'
import { Either, left, right } from '../../../../core/logic/Either'

import { compareEndTimeAfter, validateTime } from './date'
import { CompareTimeError } from './errors/CompareTimeError'
import { InvalidDateError } from './errors/InvalidDateError'

import { InvalidDurationError } from './errors/InvalidDurationError'

interface IDoctorInfoProps {
  startAt: string
  endAt: string
  price: number
  duration: number
  doctorId: string
}

export class DoctorInfo extends Entity<IDoctorInfoProps> {
  get startAt() {
    return this.props.startAt
  }
  get endAt() {
    return this.props.endAt
  }
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

    if (!validateTime(props.startAt) || !validateTime(props.endAt)) {
      left(new InvalidDateError())
    }

    if (compareEndTimeAfter(props.startAt, props.endAt)) {
      left(new CompareTimeError())
    }
  }

  static create(
    props: IDoctorInfoProps,
    id?: string
  ): Either<InvalidDateError | InvalidDurationError, DoctorInfo> {
    const doctorInfo = new DoctorInfo(props, id)
    return right(doctorInfo)
  }
}
