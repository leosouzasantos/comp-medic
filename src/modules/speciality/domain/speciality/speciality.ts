import { SpecialityEntity } from '../../entities/SpecialityEntity'
import { Either, right } from '../../../../core/logic/Either'

import { Description } from './Description'
import { InvalidDescriptionError } from './errors/InvalidDescriptionError'
import { InvalidNameError } from './errors/InvalidNameError'
import { Name } from './Name'

interface ISpecialityProps {
  name: Name
  description: Description
}

export class Speciality extends SpecialityEntity<ISpecialityProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  private constructor(props: ISpecialityProps, id?: string) {
    super(props, id)
  }

  static create(
    props: ISpecialityProps,
    id?: string
  ): Either<InvalidNameError | InvalidDescriptionError, Speciality> {
    const speciality = new Speciality(props, id)

    return right(speciality)
  }
}
