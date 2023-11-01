import { Speciality } from '../../entities/SpecialityEntity'
import { ISpecialityRepository } from '../ISpecialityRepository'

export class InMemorySpecialityRepository implements ISpecialityRepository {
  items: Speciality[] = []

  async findBySpeciality(name: string): Promise<Speciality | null> {
    return this.items.find((speciality) => speciality.name === name) || null
  }

  async findById(id: string): Promise<Speciality | null> {
    return this.items.find((speciality) => speciality.id === id) || null
  }

  async save(data: Speciality): Promise<Speciality> {
    this.items.push(data)
    return data
  }
}
