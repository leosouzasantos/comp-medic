import { randomUUID } from 'crypto'

export abstract class UserEntity<T> {
  protected readonly _id: string
  public readonly props: T
  public isAdmin: boolean = false

  get id() {
    return this._id
  }

  constructor(props: T, id?: string) {
    this._id = id || randomUUID()
    this.props = props
  }

  public equals(object?: UserEntity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof UserEntity)) {
      return false
    }

    return this._id === object._id
  }
}
