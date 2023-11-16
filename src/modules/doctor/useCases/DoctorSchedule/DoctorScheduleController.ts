import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { DoctorScheduleUseCase } from './DoctorScheduleUseCase'

type DoctorScheduleControllerRequest = {
  doctorId: string
  startAt: string
  endAt: string
  dayOfWeek: number
}

export class DoctorScheduleController implements Controller {
  constructor(private DoctorSchedule: DoctorScheduleUseCase) {}

  async handle({
    doctorId,
    startAt,
    endAt,
    dayOfWeek,
  }: DoctorScheduleControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.DoctorSchedule.execute({
        doctorId,
        startAt,
        endAt,
        dayOfWeek,
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
