import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { IDoctorInfoRepository } from '../IDoctorInfoRepository'

export class InMemoryDoctorInfoRepository implements IDoctorInfoRepository {
  constructor(public items: DoctorInfo[] = []) {}

  async create(doctor: DoctorInfo): Promise<void> {
    this.items.push(doctor)
  }
}
