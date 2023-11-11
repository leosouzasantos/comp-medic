import { Doctor } from '../../domain/doctor/doctor'
import { IDoctorRepository } from '../IDoctorRepository'

export class InMemoryDoctorRepository implements IDoctorRepository {
  constructor(public items: Doctor[] = []) {}

  async create(doctor: Doctor): Promise<void> {
    this.items.push(doctor)
  }

  async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.items.find((doctor) => doctor.crm.value === crm)
  }

  async findByUserId(userId: string): Promise<Doctor | undefined> {
    return this.items.find((doctor) => doctor.userId === userId)
  }

  async findById(id: string): Promise<Doctor | undefined> {
    return this.items.find((doctor) => doctor.id === id)
  }

  async exists(email: string): Promise<boolean> {
    return this.items.some((doctor) => doctor.email.value === email)
  }
}
