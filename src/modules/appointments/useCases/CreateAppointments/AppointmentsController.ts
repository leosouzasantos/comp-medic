import { Controller } from '../../../../core/infra/Controller'
import {
  HttpResponse,
  clientError,
  fail,
  ok,
} from '../../../../core/infra/HttpResponse'
import { AppointmentsUseCase } from './AppointmentsUseCase'

type AppointmentControllerRequest = {
  patientId: string
  doctorId: string
  date: Date
  isFinished: boolean
}

export class AppointmentController implements Controller {
  constructor(private appointment: AppointmentsUseCase) {}

  async handle({
    patientId,
    doctorId,
    date,
    isFinished,
  }: AppointmentControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.appointment.execute({
        doctorId,
        patientId,
        isFinished,
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
