import { Either, left, right } from '../../../../core/logic/Either'
import { Description } from '../../domain/speciality/Description'
import { InvalidDescriptionError } from '../../domain/speciality/errors/InvalidDescriptionError'
import { InvalidNameError } from '../../domain/speciality/errors/InvalidNameError'
import { Name } from '../../domain/speciality/Name'
import { Speciality } from '../../domain/speciality/speciality'
import { ISpecialityRepository } from '../../repositories/ISpecialityRepository'
import { SpecialityAlreadyExistsError } from './errors/SpecialityAlreadyExistsError'

type SpecialityRequest = {
  name: string
  description: string
}

type SpecialityResponse = Either<
  InvalidNameError | InvalidDescriptionError | SpecialityAlreadyExistsError,
  Speciality
>

export class CreateSpeciality {
  constructor(private specialityRepository: ISpecialityRepository) {}

  async execute({
    name,
    description,
  }: SpecialityRequest): Promise<SpecialityResponse> {
    const nameOrError = Name.create(name)
    const descriptionOrError = Description.create(description)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (descriptionOrError.isLeft()) {
      return left(descriptionOrError.value)
    }

    const specialityOrError = Speciality.create({
      name: nameOrError.value,
      description: descriptionOrError.value,
    })

    if (specialityOrError.isLeft()) {
      return left(specialityOrError.value)
    }

    const speciality = specialityOrError.value

    const specialityAlreadyExists = await this.specialityRepository.exists(
      speciality.name.value
    )

    if (specialityAlreadyExists) {
      return left(new SpecialityAlreadyExistsError(speciality.name.value))
    }

    await this.specialityRepository.create(speciality)

    return right(speciality)
  }
}
