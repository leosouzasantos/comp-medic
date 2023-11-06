import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { CreateSpeciality } from './CreateSpecialityUseCase'

type CreateSpecialityControllerRequest = {
  name: string
  description: string
}

export class CreateSpecialityController implements Controller {
  constructor(private createSpeciality: CreateSpeciality) {}

  async handle({
    name,
    description,
  }: CreateSpecialityControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createSpeciality.execute({ name, description })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
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
