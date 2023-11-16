import { Entity } from '../../../../core/domain/Entity'
import { Either, left, right } from '../../../../core/logic/Either'
import { compareEndTimeAfter, validateTime } from '../doctorInfo/date'
import { CompareTimeError } from './errors/CompareTimeError'
import { InvalidDateError } from './errors/InvalidDateError'

interface IDoctorScheduleProps {
  doctorId: string
  startAt: string
  endAt: string
  dayOfWeek: number
}

export class DoctorSchedule extends Entity<IDoctorScheduleProps> {
  get doctorId() {
    return this.props.doctorId
  }

  get startAt() {
    return this.props.startAt
  }

  get endAt() {
    return this.props.endAt
  }

  get dayOfWeek() {
    return this.props.dayOfWeek
  }

  private constructor(props: IDoctorScheduleProps, id?: string) {
    super(props, id)

    if (!validateTime(props.startAt) || !validateTime(props.endAt)) {
      left(new InvalidDateError())
    }

    if (compareEndTimeAfter(props.startAt, props.endAt)) {
      left(new CompareTimeError())
    }
  }

  static create(
    props: IDoctorScheduleProps,
    id?: string
  ): Either<InvalidDateError | CompareTimeError, DoctorSchedule> {
    const doctorSchedule = new DoctorSchedule(props, id)
    return right(doctorSchedule)
  }
}
