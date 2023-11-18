import { Controller } from '../../../../core/infra/Controller'
import { PrismaAppointmentsRepository } from '../../../../modules/appointments/repositories/prisma/PrismaAppointmentsRepository'
import { FreeScheduleController } from '../../../../modules/appointments/useCases/freeSchedules/FreeSchedulesController'
import { FreeSchedules } from '../../../../modules/appointments/useCases/freeSchedules/FreeSchedulesUseCase'
import { PrismaDoctorScheduleRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorScheduleRepository'

export function makeGetFreeSchedulesController(): Controller {
  const prismaDoctorSchedulesRepository = new PrismaDoctorScheduleRepository()
  const prismaAppointmentsRepository = new PrismaAppointmentsRepository()

  const freeSchedule = new FreeSchedules(
    prismaDoctorSchedulesRepository,
    prismaAppointmentsRepository
  )

  const freeScheduleController = new FreeScheduleController(freeSchedule)

  return freeScheduleController
}
