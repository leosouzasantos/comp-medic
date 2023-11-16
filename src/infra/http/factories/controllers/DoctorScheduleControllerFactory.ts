import { Controller } from '../../../../core/infra/Controller'
import { PrismaDoctorRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorRepository'
import { PrismaDoctorScheduleRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorScheduleRepository'
import { DoctorScheduleController } from '../../../../modules/doctor/useCases/DoctorSchedule/DoctorScheduleController'
import { DoctorScheduleUseCase } from '../../../../modules/doctor/useCases/DoctorSchedule/DoctorScheduleUseCase'

export function MakeCreateDoctorScheduleController(): Controller {
  const doctorRepository = new PrismaDoctorRepository()
  const doctorScheduleRepostory = new PrismaDoctorScheduleRepository()

  const doctorSchedule = new DoctorScheduleUseCase(
    doctorRepository,
    doctorScheduleRepostory
  )

  const doctorScheduleController = new DoctorScheduleController(doctorSchedule)

  return doctorScheduleController
}
