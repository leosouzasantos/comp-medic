import { Speciality } from '../entities/SpecialityEntity'

export interface ISpecialityRepository {
  save(data: Speciality): Promise<Speciality>
  findBySpeciality(name: string): Promise<Speciality | null>
  findById(id: string): Promise<Speciality | null>
}
