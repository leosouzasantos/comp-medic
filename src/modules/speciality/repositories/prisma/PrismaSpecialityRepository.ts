import { prisma } from '../../../../infra/prisma/client'
import { Speciality } from '../../domain/speciality/speciality'
import { SpecialityMapper } from '../../mappers/SpecialityMapper'
import { ISpecialityRepository } from '../ISpecialityRepository'

export class PrismaSpeciality implements ISpecialityRepository {
  async create(speciality: Speciality): Promise<void> {
    const data = SpecialityMapper.toPersistence(speciality)
    await prisma.speciality.create({ data })
  }
  async findByName(name: string): Promise<Speciality> {
    const speciality = await prisma.speciality.findUnique({ where: { name } })
    if (!speciality) {
      throw new Error('Error creating Speciality object')
    }
    return SpecialityMapper.toDomain(speciality)
  }

  async exists(name: string): Promise<boolean> {
    const specialityExists = await prisma.speciality.findUnique({
      where: { name },
    })

    return !!specialityExists
  }

  async findById(id: string): Promise<Speciality | undefined> {
    const speciality = await prisma.speciality.findUnique({ where: { id } })

    if (!speciality) {
      throw new Error('Error when searching for speciality id')
    }
    return SpecialityMapper.toDomain(speciality)
  }
}
