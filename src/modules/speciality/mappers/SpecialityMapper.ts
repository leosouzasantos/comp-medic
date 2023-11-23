import { Speciality as PersistenceSpeciality } from '@prisma/client'
import { Speciality } from '../domain/speciality/speciality'
import { Name } from '../domain/speciality/name'
import { Description } from '../domain/speciality/description'

export class SpecialityMapper {
  static toDomain(raw: PersistenceSpeciality): Speciality {
    const nameOrError = Name.create(raw.name)
    const descriptionOrError = Description.create(raw.description)

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.')
    }

    if (descriptionOrError.isLeft()) {
      throw new Error('Description value is invalid.')
    }

    const specialityOrError = Speciality.create(
      {
        name: nameOrError.value,
        description: descriptionOrError.value,
      },
      raw.id
    )

    if (specialityOrError.isRight()) {
      return specialityOrError.value
    }
    throw new Error('Error creating Speciality object')
  }

  static toPersistence(speciality: Speciality) {
    return {
      id: speciality.id,
      name: speciality.name.value,
      description: speciality.description.value,
    }
  }
}
