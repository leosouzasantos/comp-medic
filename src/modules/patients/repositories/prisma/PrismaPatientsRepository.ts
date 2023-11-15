import { prisma } from '../../../../infra/prisma/client'
import { Patient } from '../../domain/patient/patients'
import { PatientMapper } from '../../mappers/PatientMapper'
import { IPatientsRepository } from '../IPatientsRepository'

export class PrismaPatientsRepository implements IPatientsRepository {
  async create(patient: Patient): Promise<void> {
    const data = PatientMapper.toPersistence(patient)

    await prisma.patient.create({ data })
  }
  async findByDocument(document: string): Promise<Patient | undefined> {
    const patient = await prisma.patient.findUnique({
      where: { document },
    })

    if (!patient) {
      return undefined
    }
    return PatientMapper.toDomain(patient)
  }
  async findByEmail(email: string): Promise<Patient | undefined> {
    const patient = await prisma.patient.findUnique({
      where: { email },
    })

    if (!patient) {
      return undefined
    }
    return PatientMapper.toDomain(patient)
  }

  async findById(id: string): Promise<Patient | undefined> {
    const patient = await prisma.patient.findUnique({
      where: { id },
    })

    if (!patient) {
      throw new Error('Error when fetching Patient object')
    }
    return PatientMapper.toDomain(patient)
  }
  async exists(email: string): Promise<boolean> {
    const patientExists = await prisma.patient.findUnique({
      where: { email },
    })

    return !!patientExists
  }
}
