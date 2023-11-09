import { Speciality } from '../../domain/speciality/speciality'
import { ISpecialityRepository } from '../ISpecialityRepository'

export class InMemorySpecialityRepository implements ISpecialityRepository {
  constructor(public items: Speciality[] = []) {}
  async create(speciality: Speciality): Promise<void> {
    this.items.push(speciality)
  }
  async findByName(name: string): Promise<Speciality | undefined> {
    return this.items.find((speciality) => {
      speciality.name.value === name
    })
  }
  async exists(name: string): Promise<boolean> {
    return this.items.some((speciality) => speciality.name.value === name)
  }

  async findById(id: string): Promise<Speciality | undefined> {
    return this.items.find((speciality) => speciality.id === id)
  }
}
