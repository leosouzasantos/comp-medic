import { Doctor } from '../domain/doctor/doctor'

export interface IDoctorRepository {
  create(doctor: Doctor): Promise<void>
  findByCRM(crm: string): Promise<Doctor | undefined>
}
