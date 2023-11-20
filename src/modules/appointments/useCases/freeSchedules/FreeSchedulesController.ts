import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { FreeSchedules } from './FreeSchedulesUseCase'

type FreeSchedulesControllerRequest = {
  doctorId: string
  date: string
}

export class FreeScheduleController implements Controller {
  constructor(private freeSchedule: FreeSchedules) {}

  async handle({
    doctorId,
    date,
  }: FreeSchedulesControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.freeSchedule.execute({
        doctorId,
        date,
      })
      if (result.isLeft()) {
        const error = result.value
        return clientError(error)
      } else {
        const message = result.value

        return ok({ message })
      }
    } catch (err: any) {
      return fail(err)
    }
  }
}
