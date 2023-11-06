import { randomUUID } from 'crypto'

export abstract class SpecialityEntity<T> {
  protected readonly _id: string
  public readonly props: T

  get id() {
    return this._id
  }

  constructor(props: T, id?: string) {
    this._id = id || randomUUID()
    this.props = props
  }

  public equals(object?: SpecialityEntity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof SpecialityEntity)) {
      return false
    }

    return this._id === object._id
  }
}
