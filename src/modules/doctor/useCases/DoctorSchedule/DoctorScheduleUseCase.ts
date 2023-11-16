import { Either, left, right } from '../../../../core/logic/Either'
import { DoctorSchedule } from '../../domain/doctorSchedule/doctorSchedule'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'
import { IDoctorScheduleRepository } from '../../repositories/IDoctorScheduleRepository'
import { InvalidDoctorError } from './errors/InvalidDoctorError'

type DoctorSchedulesRequest = {
  startAt: string
  endAt: string
  dayOfWeek: number
  doctorId: string
}

type DoctorScheduleResponse = Either<InvalidDoctorError, DoctorSchedule>

export class DoctorScheduleUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository
  ) {}

  async execute({
    doctorId,
    startAt,
    endAt,
    dayOfWeek,
  }: DoctorSchedulesRequest): Promise<DoctorScheduleResponse> {
    const doctorById = await this.doctorRepository.findById(doctorId)

    if (!doctorById) {
      return left(new InvalidDoctorError(doctorId))
    }

    const doctorScheduleOrError = DoctorSchedule.create({
      doctorId,
      startAt,
      endAt,
      dayOfWeek,
    })

    if (doctorScheduleOrError.isLeft()) {
      return left(doctorScheduleOrError.value)
    }

    const doctorSchedule = doctorScheduleOrError.value

    await this.doctorScheduleRepository.create(doctorSchedule)

    return right(doctorSchedule)
  }
}
