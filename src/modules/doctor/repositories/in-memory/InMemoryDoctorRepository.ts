import { Crm } from '../../domain/doctor/crm'
import { Doctor } from '../../domain/doctor/doctor'
import { IDoctorRepository } from '../IDoctorRepository'

export class InMemoryDoctorRepository implements IDoctorRepository {
  constructor(public items: Doctor[] = []) {}

  async create(doctor: Doctor): Promise<void> {
    this.items.push(doctor)
  }

  async findByCRM(crm: string): Promise<Doctor> {
    return this.items.find((doctor) => doctor.crm.value === crm)
  }
}
