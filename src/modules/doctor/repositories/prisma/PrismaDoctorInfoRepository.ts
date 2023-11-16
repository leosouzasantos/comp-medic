import { prisma } from '../../../../infra/prisma/client'
import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { DoctorInfoMapper } from '../../mappers/DoctorInfoMapper'
import { IDoctorInfoRepository } from '../IDoctorInfoRepository'

export class PrismaDoctorInfoRepository implements IDoctorInfoRepository {
  async createOrUpdate(doctorInfo: DoctorInfo): Promise<void> {
    const data = DoctorInfoMapper.toPersistence(doctorInfo)

    await prisma.doctorInfo.upsert({
      where: { doctor_id: data.doctorId },
      create: {
        duration: data.duration,
        price: data.price,
        id: data.id,
        doctor_id: data.doctorId,
      },
      update: {
        duration: data.duration,
        price: data.price,
      },
    })
  }
}
