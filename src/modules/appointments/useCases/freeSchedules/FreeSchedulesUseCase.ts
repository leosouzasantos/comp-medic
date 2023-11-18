import dayjs from 'dayjs'
import { Either, left, right } from '../../../../core/logic/Either'
import { formatDate, getDayOfWeek } from '../../../../utils/date'
import { IDoctorScheduleRepository } from '../../../doctor/repositories/IDoctorScheduleRepository'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { DoctorNotAvailableError } from './errors/DoctorNotAvailableError'
import { InvalidDateError } from './errors/InvalidDateError'
import { InvalidDoctorError } from './errors/InvalidDoctorError'

type FreeScheduleRequest = {
  doctorId: string
  date: string
}

type FreeTime = {
  time: string
}

type FreeScheduleResponse = {
  doctorId: string
  freeTime: FreeTime[]
}

export class FreeSchedules {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    doctorId,
    date,
  }: FreeScheduleRequest): Promise<
    Either<DoctorNotAvailableError, FreeScheduleResponse>
  > {
    if (!doctorId) {
      left(new InvalidDoctorError())
    }

    if (!date) {
      left(new InvalidDateError())
    }

    const dayOfWeek = getDayOfWeek(date)

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        doctorId,
        dayOfWeek
      )

    if (!doctorSchedule) {
      return left(new DoctorNotAvailableError())
    }

    const result =
      await this.appointmentsRepository.findAllSchedulesByDoctorAndDate(
        doctorId,
        date
      )

    const startAt = doctorSchedule.startAt
    const endAt = doctorSchedule.endAt
    const duration = doctorSchedule.doctor.DoctorInfo.duration

    let timeNow = startAt
    const freeTime: FreeTime[] = []

    while (startAt <= endAt) {
      const existsAppointment = result.find((appointment) => {
        const appointmentDateFormat = formatDate(appointment.date, 'HH:mm')
        return appointmentDateFormat === timeNow
      })

      if (!existsAppointment) {
        freeTime.push({
          time: timeNow,
        })
      }
      timeNow = dayjs(date + timeNow)
        .add(duration, 'minute')
        .format('HH:mm')
    }

    const response: FreeScheduleResponse = {
      doctorId: doctorId,
      freeTime,
    }

    return right(response)
  }
}
