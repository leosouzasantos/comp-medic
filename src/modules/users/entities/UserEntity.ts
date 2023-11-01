type IUser = {
  name: string
  password: string
  username: string
}

export class User {
  private constructor(props: IUser) {
    this.name = props.name
    this.username = props.username
    this.password = props.password
    this.isAdmin = false
  }
  name: string
  password: string
  username: string
  isAdmin: boolean

  static create(props: IUser) {
    const user = new User(props)
    return user
  }
}
