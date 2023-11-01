export class AlreadyExistsError extends Error {
  constructor(message: string, statusCode = 500, name = '') {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }

  statusCode?: number
  name: string
}
