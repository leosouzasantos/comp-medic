import { Controller } from '../../../../core/infra/Controller'
import { PrismaDoctorRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorRepository'
import { CreateDoctor } from '../../../../modules/doctor/useCases/CreateDoctor/CreateDoctorUseCase'
import { CreateDoctorController } from '../../../../modules/doctor/useCases/CreateDoctor/DoctorController'
import { PrismaSpeciality } from '../../../../modules/speciality/repositories/prisma/PrismaSpecialityRepository'
import { PrismaUserRepository } from '../../../../modules/users/repositories/prisma/PrismaUserRepository'

export function MakeCreateDoctorController(): Controller {
  const doctorRepository = new PrismaDoctorRepository()
  const specialityRepository = new PrismaSpeciality()
  const userRepository = new PrismaUserRepository()

  const createDoctor = new CreateDoctor(
    userRepository,
    specialityRepository,
    doctorRepository
  )

  const createDoctorController = new CreateDoctorController(createDoctor)

  return createDoctorController
}
