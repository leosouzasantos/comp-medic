import { Either, left, right } from '../../../../core/logic/Either'
import { dateToString, formatDate, getDayOfWeek } from '../../../../utils/date'
import { IDoctorRepository } from '../../../doctor/repositories/IDoctorRepository'
import { IDoctorScheduleRepository } from '../../../doctor/repositories/IDoctorScheduleRepository'
import { IPatientsRepository } from '../../../patients/repositories/IPatientsRepository'
import { Appointments } from '../../domain/appointments/appointments'
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository'
import { DoctorNotAvailableError } from './errors/DoctorNotAvailableError'
import { InvalidAppointmentError } from './errors/InvalidAppointmentError'
import { InvalidDoctorError } from './errors/InvalidDoctorError'
import { InvalidPatientError } from './errors/InvalidPatientError'

type AppointmentRequest = {
  patientId: string
  doctorId: string
  date: Date
  isFinished: boolean
}

type AppointmentsResponse = Either<
  | InvalidDoctorError
  | InvalidPatientError
  | DoctorNotAvailableError
  | InvalidAppointmentError,
  Appointments
>

export class AppointmentsUseCase {
  constructor(
    private patientRepository: IPatientsRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentsRepository
  ) {}

  async execute({
    patientId,
    doctorId,
    date,
    isFinished,
  }: AppointmentRequest): Promise<AppointmentsResponse> {
    const doctorExists = this.doctorRepository.findById(doctorId)

    if (!doctorExists) {
      return left(new InvalidDoctorError())
    }

    const patientExists = this.patientRepository.findById(patientId)

    if (!patientExists) {
      return left(new InvalidPatientError())
    }

    const dayOfWeek = getDayOfWeek(dateToString(date))

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        doctorId,
        dayOfWeek
      )

    if (!doctorSchedule) {
      return left(new DoctorNotAvailableError())
    }

    const dateFormat = formatDate(date, 'YYYY:MM:DD HH:mm')

    const existsAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDatetime(
        doctorId,
        dateFormat
      )

    if (existsAppointmentDoctor) {
      return left(new InvalidAppointmentError())
    }

    const existsAppointmentPatient =
      await this.appointmentRepository.findAppointmentByPatientAndDatetime(
        patientId,
        dateFormat
      )

    if (existsAppointmentPatient) {
      return left(new InvalidAppointmentError())
    }

    const appointmentOrError = Appointments.create({
      date: date,
      doctorId,
      patientId,
      isFinished,
    })

    const appointment = appointmentOrError

    await this.appointmentRepository.create(appointment)

    return right(appointment)
  }
}
