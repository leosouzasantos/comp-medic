import { prisma } from '../../../../infra/prisma/client'
import { Speciality } from '../../entities/SpecialityEntity'
import { ISpecialityRepository } from '../ISpecialityRepository'

export class PrismaSpeciality implements ISpecialityRepository {
  async save(data: Speciality): Promise<Speciality> {
    const speciality = await prisma.speciality.create({
      data: {
        name: data.name,
        description: data.description,
        id: data.id,
      },
    })
    return speciality
  }
  async findBySpeciality(name: string): Promise<Speciality | null> {
    return await prisma.speciality.findUnique({
      where: { name },
    })
  }
  async findById(id: string): Promise<Speciality | null> {
    return await prisma.speciality.findUnique({
      where: { id },
    })
  }
}
