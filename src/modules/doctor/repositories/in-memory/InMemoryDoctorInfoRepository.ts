import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { IDoctorInfoRepository } from '../IDoctorInfoRepository'

export class InMemoryDoctorInfoRepository implements IDoctorInfoRepository {
  constructor(public items: DoctorInfo[] = []) {}

  async create(doctorInfo: DoctorInfo): Promise<void> {
    this.items.push(doctorInfo)
  }
}
