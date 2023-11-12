import { Either, left, right } from '../../../../core/logic/Either'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'
import { InvalidDoctorError } from './errors/InvalidDoctorError'
import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'

type DoctorInfoRequest = {
  doctorId: string
  startAt: string
  endAt: string
  price: number
  duration: number
}

type DoctorInfoResponse = Either<InvalidDoctorError, DoctorInfo>

export class DoctorInfoUseCase {
  constructor(private doctorRepository: IDoctorRepository) {}

  async execute(
    { doctorId, startAt, endAt, price, duration }: DoctorInfoRequest,
    userId: string
  ): Promise<DoctorInfoResponse> {
    const doctorByUserId = await this.doctorRepository.findByUserId(userId)

    if (!doctorByUserId) {
      left(new InvalidDoctorError(userId))
    }

    const doctorOrError = DoctorInfo.create({
      doctorId,
      startAt,
      endAt,
      price,
      duration,
    })

    if (doctorOrError.isLeft()) {
      return left(doctorOrError.value)
    }

    const doctorInfo = doctorOrError.value

    return right(doctorInfo)
  }
}
