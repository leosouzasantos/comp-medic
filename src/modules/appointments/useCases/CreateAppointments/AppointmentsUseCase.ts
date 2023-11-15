import { left } from '../../../../core/logic/Either'
import { IDoctorRepository } from '../../../doctor/repositories/IDoctorRepository'
import { IPatientsRepository } from '../../../patients/repositories/IPatientsRepository'
import { InvalidDoctorError } from './errors/InvalidDoctorError'
import { InvalidPatientError } from './errors/InvalidPatientError'

type CreateAppointmentRequest = {
  patientId: string
  doctorId: string
  date: Date
}

export class AppointmentsUseCase {
  constructor(
    private patientRepository: IPatientsRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute({ patientId, doctorId, date }: CreateAppointmentRequest) {
    const doctorExists = this.doctorRepository.findById(doctorId)

    if (!doctorExists) {
      return left(new InvalidDoctorError())
    }

    const patientExists = this.patientRepository.findById(patientId)

    if (!patientExists) {
      return left(new InvalidPatientError())
    }
  }
}
