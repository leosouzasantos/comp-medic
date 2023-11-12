import { DoctorInfo } from '../domain/doctorInfo/doctorInfo'

export interface IDoctorInfoRepository {
  create(doctorInfo: DoctorInfo): Promise<void>
}
