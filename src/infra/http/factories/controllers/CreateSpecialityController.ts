import { Controller } from '../../../../core/infra/Controller'
import { PrismaSpeciality } from '../../../../modules/speciality/repositories/prisma/PrismaSpecialityRepository'
import { CreateSpecialityController } from '../../../../modules/speciality/useCases/CreateSpeciality/CreateSpecialityController'
import { CreateSpeciality } from '../../../../modules/speciality/useCases/CreateSpeciality/CreateSpecialityUseCase'

export function MakeCreateSpecialityController(): Controller {
  const prismaSpecialityRepository = new PrismaSpeciality()
  const createSpecialyUseCase = new CreateSpeciality(prismaSpecialityRepository)

  const createSpecialityController = new CreateSpecialityController(
    createSpecialyUseCase
  )

  return createSpecialityController
}
