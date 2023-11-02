import { AlreadyExistsError } from '../../../../errors/AlreadyExistsError'
import { Speciality } from '../../entities/SpecialityEntity'
import { ISpecialityRepository } from '../../repositories/ISpecialityRepository'

type SpecialityRequest = {
  name: string
  description: string
}

export class CreateSpeciality {
  constructor(private specialityRepository: ISpecialityRepository) {}
  async execute(data: SpecialityRequest) {
    const speciality = Speciality.create(data)

    if (!data.name) {
      throw Error('Speciality name is required')
    }

    const existSpeciality = await this.specialityRepository.findBySpeciality(
      data.name
    )

    if (existSpeciality) {
      throw new AlreadyExistsError('Speciality already exists', 400)
    }

    const specialityCreated = await this.specialityRepository.save(speciality)
    return specialityCreated
  }
}
