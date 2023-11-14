import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { IDoctorInfoRepository } from '../IDoctorInfoRepository'

export class InMemoryDoctorInfoRepository implements IDoctorInfoRepository {
  constructor(public items: DoctorInfo[] = []) {}

  async createOrUpdate(doctorInfo: DoctorInfo): Promise<void> {
    const doctorIndex = this.items.findIndex(
      (findDoctor) => findDoctor.id === doctorInfo.id
    )

    if (doctorIndex > 0) {
      this.items[doctorIndex] = doctorInfo
    } else {
      this.items.push(doctorInfo)
    }
  }
}
