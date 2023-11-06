import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  conflict,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { CreateUser } from './CreateUserUseCase'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

type UserControllerRequest = {
  name: string
  username: string
  password: string
}

export class UserController implements Controller {
  constructor(private userUseCase: CreateUser) {}

  async handle(request: UserControllerRequest): Promise<HttpResponse> {
    try {
      const { name, username, password } = request

      const result = await this.userUseCase.execute({
        name,
        username,
        password,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case UserAlreadyExistsError:
            return conflict(error)
          default:
            return clientError(error)
        }
      } else {
        return ok(result)
      }
    } catch (err: any) {
      return fail(err)
    }
  }
}
