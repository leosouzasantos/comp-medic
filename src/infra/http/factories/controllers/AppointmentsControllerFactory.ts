import { Controller } from '../../../../core/infra/Controller'
import { PrismaAppointmentsRepository } from '../../../../modules/appointments/repositories/prisma/PrismaAppointmentsRepository'
import { AppointmentController } from '../../../../modules/appointments/useCases/CreateAppointments/AppointmentsController'
import { AppointmentsUseCase } from '../../../../modules/appointments/useCases/CreateAppointments/AppointmentsUseCase'
import { PrismaDoctorRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorRepository'
import { PrismaDoctorScheduleRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorScheduleRepository'
import { PrismaPatientsRepository } from '../../../../modules/patients/repositories/prisma/PrismaPatientsRepository'
import { MailtrapProvider } from '../../../providers/implementations/mail/MailtrapProvider'

export function makeAppointmentController(): Controller {
  const prismaDoctorRepository = new PrismaDoctorRepository()
  const prismaPatientRepository = new PrismaPatientsRepository()
  const prismaAppointmentRepository = new PrismaAppointmentsRepository()
  const prismaDoctorScheduleRepository = new PrismaDoctorScheduleRepository()
  const mailtrapProvider = new MailtrapProvider()

  const appointment = new AppointmentsUseCase(
    prismaPatientRepository,
    prismaDoctorRepository,
    prismaDoctorScheduleRepository,
    prismaAppointmentRepository,
    mailtrapProvider
  )

  const appointmentController = new AppointmentController(appointment)

  return appointmentController
}
