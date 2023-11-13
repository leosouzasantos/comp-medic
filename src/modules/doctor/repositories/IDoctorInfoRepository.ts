import { DoctorInfo } from '../domain/doctorInfo/doctorInfo'

export interface IDoctorInfoRepository {
  createOrUpdate(doctorInfo: DoctorInfo): Promise<void>
}
