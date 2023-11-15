import { Patient } from '../domain/patient/patients'

export interface IPatientsRepository {
  create(patient: Patient): Promise<void>
  findByEmail(email: string): Promise<Patient | undefined>
  findByDocument(document: string): Promise<Patient | undefined>
  findById(id: string): Promise<Patient | undefined>
  exists(email: string): Promise<boolean>
}
