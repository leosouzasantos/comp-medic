import { DoctorInfo } from '../domain/doctorInfo/doctorInfo'

export interface IDoctorInfoRepository {
  create(doctor: DoctorInfo): Promise<void>
}
