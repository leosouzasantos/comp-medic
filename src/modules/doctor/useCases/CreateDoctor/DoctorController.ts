import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { CreateDoctor } from './CreateDoctorUseCase'

type DoctorControllerRequest = {
  crm: string
  email: string
  userId: string
  specialityId: string
}

export class CreateDoctorController implements Controller {
  constructor(private createDoctor: CreateDoctor) {}

  async handle({
    crm,
    email,
    userId,
    specialityId,
  }: DoctorControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createDoctor.execute({
        crm,
        email,
        userId,
        specialityId,
      })

      if (result.isLeft()) {
        const error = result.value
        return clientError(error)
      } else {
        return ok(result)
      }
    } catch (err: any) {
      return fail(err)
    }
  }
}
