import { prisma } from '../../../../infra/prisma/client'
import { Doctor } from '../../domain/doctor/doctor'
import { DoctorMapper } from '../../mappers/DoctorMapper'
import { IDoctorRepository } from '../IDoctorRepository'

export class PrismaDoctorRepository implements IDoctorRepository {
  async findById(id: string): Promise<Doctor | undefined> {
    const doctor = await prisma.doctor.findUnique({ where: { id } })

    if (!doctor) {
      throw new Error('Error when fetching Doctor object')
    }
    return DoctorMapper.toDomain(doctor)
  }
  async exists(email: string): Promise<boolean> {
    const doctorExists = await prisma.doctor.findUnique({ where: { email } })
    return !!doctorExists
  }
  async create(doctor: Doctor): Promise<void> {
    const data = DoctorMapper.toPersistence(doctor)

    await prisma.doctor.create({
      data,
    })
  }
  async findByCRM(crm: string): Promise<Doctor | undefined> {
    const doctor = await prisma.doctor.findUnique({
      where: { crm },
    })

    if (!doctor) {
      throw new Error('Error when fetching Doctor object')
    }

    return DoctorMapper.toDomain(doctor)
  }
}
