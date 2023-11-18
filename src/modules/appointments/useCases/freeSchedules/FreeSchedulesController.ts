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
  constructor(private FreeSchedule: FreeSchedules) {}

  async handle({
    doctorId,
    date,
  }: FreeSchedulesControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.FreeSchedule.execute({
        doctorId,
        date,
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
