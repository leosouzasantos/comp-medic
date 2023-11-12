import { prisma } from '../../../../infra/prisma/client'
import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { DoctorInfoMapper } from '../../mappers/DoctorInfoMapper'
import { IDoctorInfoRepository } from '../IDoctorInfoRepository'

export class PrismaDoctorInfoRepository implements IDoctorInfoRepository {
  async create(doctorInfo: DoctorInfo): Promise<void> {
    const data = DoctorInfoMapper.toPersistence(doctorInfo)

    await prisma.doctorInfo.create({
      data: {
        duration: data.duration,
        end_at: data.endAt,
        start_at: data.startAt,
        price: data.price,
        id: data.id,
        doctor_id: data.doctorId,
      },
    })
  }
}
