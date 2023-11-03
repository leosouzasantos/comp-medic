export class BadRequest extends Error {
  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'BadRequest'
    this.statusCode = statusCode
  }
  statusCode?: number
}
