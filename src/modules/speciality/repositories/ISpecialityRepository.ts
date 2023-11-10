import { Speciality } from '../domain/speciality/speciality'

export interface ISpecialityRepository {
  create(speciality: Speciality): Promise<void>
  findByName(name: string): Promise<Speciality | undefined>
  exists(name: string): Promise<boolean>
  findById(id: string): Promise<Speciality | undefined>
}
