import { Entity } from '../../../../core/domain/Entity'
import { left } from '../../../../core/logic/Either'
import { compareEndTimeAfter, validateTime } from '../doctorInfo/date'
import { CompareTimeError } from './errors/CompareTimeError'
import { DuplicateError } from './errors/DuplicateError'
import { InvalidEndAtError } from './errors/InvalidEndAtError'
import { InvalidSchedulesError } from './errors/InvalidSchedulesError'
import { InvalidStartAtError } from './errors/InvalidStartAtError'

type Schedules = {
  startAt: string
  endAt: string
  dayOfWeek: number
}

interface IDoctorScheduleProps {
  doctorId: string
  schedules: Schedules[]
}

export class DoctorSchedule extends Entity<IDoctorScheduleProps> {
  get doctorId() {
    return this.props.doctorId
  }

  get schedules() {
    return this.props.schedules
  }

  private constructor(props: IDoctorScheduleProps, id?: string) {
    super(props, id)
    if (!props.schedules) {
      left(new InvalidSchedulesError())
    }

    validDuplicateSchedules(props.schedules)
    validateTimes(props.schedules)
  }

  static create(props: IDoctorScheduleProps, id?: string) {
    const doctorSchedule = new DoctorSchedule(props, id)
    return doctorSchedule
  }
}

const validDuplicateSchedules = (schedules: Schedules[]) => {
  const hasUniqueValue = new Set(schedules.map((value) => value.dayOfWeek))

  if (hasUniqueValue.size < schedules.length) {
    left(new DuplicateError())
  }
}

const validateTimes = (schedules: Schedules[]) => {
  schedules.forEach((schedule) => {
    if (!validateTime(schedule.startAt)) {
      left(new InvalidStartAtError())
    }

    if (!validateTime(schedule.endAt)) {
      left(new InvalidEndAtError())
    }

    if (!compareEndTimeAfter(schedule.startAt, schedule.endAt)) {
      left(new CompareTimeError())
    }
  })
}
