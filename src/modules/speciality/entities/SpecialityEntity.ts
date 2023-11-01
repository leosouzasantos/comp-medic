import { randomUUID } from 'crypto'

type ISpeciality = {
  name: string
  description: string
}

export class Speciality {
  private constructor(props: ISpeciality) {
    this.name = props.name
    this.description = props.description
    this.id = randomUUID()
  }
  id: string
  name: string
  description: string

  static create(props: ISpeciality) {
    const speciality = new Speciality(props)
    return speciality
  }
}
