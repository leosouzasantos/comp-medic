import { AuthenticateUser } from './AuthenticatecaseUserUseCase'
import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  ok,
  fail,
  clientError,
} from '../../../../core/infra/HttpResponse'

type AuthenticateUserControllerRequest = {
  username: string
  password: string
}

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUser: AuthenticateUser) {}

  async handle({
    username,
    password,
  }: AuthenticateUserControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.authenticateUser.execute({ username, password })
      if (result.isLeft()) {
        const error = result.value
        return clientError(error)
      } else {
        const { token, refreshToken } = result.value
        return ok({ token, refreshToken })
      }
    } catch (err: any) {
      return fail(err)
    }
  }
}
