import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { CreatePatient } from './CreatePatientsUseCase'

type PatientControllerRequest = {
  email: string
  document: string
  userId: string
}

export class CreatePatientController implements Controller {
  constructor(private createPatient: CreatePatient) {}

  async handle({
    email,
    document,
    userId,
  }: PatientControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createPatient.execute({
        email,
        document,
        userId,
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
