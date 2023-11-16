import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { DoctorInfoUseCase } from './DoctorInfoUseCase'

type DoctorControllerRequest = {
  price: number
  duration: number
  doctorId: string
}

export class DoctorInfoController implements Controller {
  constructor(private DoctorInfo: DoctorInfoUseCase) {}

  async handle({
    price,
    duration,
    doctorId,
  }: DoctorControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.DoctorInfo.execute({
        price,
        duration,
        doctorId,
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
