import { PrismaSpeciality } from '../../repositories/prisma/PrismaSpecialityRepository'
import { SpecialityController } from './CreateSpecialityController'

const prismaSpecialityRepository = new PrismaSpeciality()

const specialityController = new SpecialityController(
  prismaSpecialityRepository
)

export { specialityController }
