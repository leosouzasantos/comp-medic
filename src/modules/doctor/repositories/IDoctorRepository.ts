import { Doctor } from '../domain/doctor/doctor'
import { DoctorWithUserDTO } from '../dtos/DoctorDTO'

export interface IDoctorRepository {
  create(doctor: Doctor): Promise<void>
  findByCRM(crm: string): Promise<Doctor | undefined>
  findById(id: string): Promise<DoctorWithUserDTO | null>
  findByUserId(userId: string): Promise<Doctor | undefined>
  exists(email: string): Promise<boolean>
}
