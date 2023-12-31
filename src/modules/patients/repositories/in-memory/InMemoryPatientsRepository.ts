import { Patient } from '../../domain/patient/patients'
import { IPatientsRepository } from '../IPatientsRepository'

export class InMemoryPatientsRepository implements IPatientsRepository {
  constructor(public items: Patient[] = []) {}
  async create(patient: Patient): Promise<void> {
    this.items.push(patient)
  }
  async findByEmail(email: string): Promise<Patient | undefined> {
    return this.items.find((patient) => patient.email.value === email)
  }
  async findByDocument(document: string): Promise<Patient | undefined> {
    return this.items.find((patient) => patient.document.value === document)
  }
  async findById(id: string): Promise<Patient | undefined> {
    return this.items.find((patient) => patient.id === id)
  }
  async exists(email: string): Promise<boolean> {
    return this.items.some((patient) => patient.email.value === email)
  }
}
