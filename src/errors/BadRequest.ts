export class BadRequest extends Error {
  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'PARAMETER_REQUIRED_ERROR'
    this.statusCode = statusCode
  }
  statusCode?: number
}
