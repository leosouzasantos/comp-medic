import { Patient } from '../domain/patient/patients'
import { PatientWithUserDTO } from '../dtos/patientDTO'

export interface IPatientsRepository {
  create(patient: Patient): Promise<void>
  findByEmail(email: string): Promise<Patient | undefined>
  findByDocument(document: string): Promise<Patient | undefined>
  findById(id: string): Promise<PatientWithUserDTO>
  exists(email: string): Promise<boolean>
}
