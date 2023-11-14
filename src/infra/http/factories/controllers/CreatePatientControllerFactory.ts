import { Controller } from '../../../../core/infra/Controller'
import { PrismaPatientsRepository } from '../../../../modules/patients/repositories/prisma/PrismaPatientsRepository'
import { CreatePatientController } from '../../../../modules/patients/useCases/createPatients/CreatePatientsController'
import { CreatePatient } from '../../../../modules/patients/useCases/createPatients/CreatePatientsUseCase'
import { PrismaUserRepository } from '../../../../modules/users/repositories/prisma/PrismaUserRepository'

export function MakeCreatePatientController(): Controller {
  const userRepository = new PrismaUserRepository()
  const patientRepository = new PrismaPatientsRepository()

  const createPatient = new CreatePatient(userRepository, patientRepository)

  const createPatientController = new CreatePatientController(createPatient)
  return createPatientController
}
