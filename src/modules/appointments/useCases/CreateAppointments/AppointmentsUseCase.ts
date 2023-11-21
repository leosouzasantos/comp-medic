import { Either, left, right } from '../../../../core/logic/Either'
import { IMailProvider } from '../../../../infra/providers/models/IMailProvider'
import {
  dateToString,
  formatDateUTC,
  getDayOfWeek,
  toDate,
} from '../../../../utils/date'
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
  note: string
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
    private appointmentRepository: IAppointmentsRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({
    patientId,
    doctorId,
    date,
    isFinished,
    note,
  }: AppointmentRequest): Promise<AppointmentsResponse> {
    const doctorExists = await this.doctorRepository.findById(doctorId)

    if (!doctorExists) {
      return left(new InvalidDoctorError())
    }

    const patientExists = await this.patientRepository.findById(patientId)

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

    const dateFormat = formatDateUTC(date, 'YYYY:MM:DD HH:mm')

    const existsAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDatetime(
        doctorExists.id,
        dateFormat
      )

    if (existsAppointmentDoctor) {
      return left(new InvalidAppointmentError())
    }

    const existsAppointmentPatient =
      await this.appointmentRepository.findAppointmentByPatientAndDatetime(
        patientExists.id,
        dateFormat
      )

    if (existsAppointmentPatient) {
      return left(new InvalidAppointmentError())
    }

    const appointmentOrError = Appointments.create({
      date: toDate(date),
      doctorId,
      patientId,
      isFinished,
      note,
    })

    const appointment = appointmentOrError

    await this.appointmentRepository.create(appointment)
    await this.mailProvider.sendEmail({
      to: patientExists.email.value,
      from: 'Appointment scheduling <noreplay@compmedic.com',
      text: `
            Hello ${patientExists.email.value}! <br/>
            would like to confirm the <b>appointment scheduling</b> for the day ${date}
            with the doctor ${doctorExists.email}`,
      subject: 'Appointment scheduling',
    })

    return right(appointment)
  }
}
