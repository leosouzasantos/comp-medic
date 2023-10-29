import { randomUUID } from 'crypto'
type IUser = {
  name: string
  password: string
  username: string
}

export class User {
  constructor(props: IUser) {
    this.name = props.name
    this.username = props.username
    this.password = props.password
    this.id = randomUUID()
    this.isAdmin = false
  }
  name: string
  password: string
  username: string
  id: string
  isAdmin: boolean
}
