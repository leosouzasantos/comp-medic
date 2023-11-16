import { Either, left, right } from '../../../../core/logic/Either'
import { IDoctorRepository } from '../../repositories/IDoctorRepository'
import { InvalidDoctorError } from './errors/InvalidDoctorError'
import { DoctorInfo } from '../../domain/doctorInfo/doctorInfo'
import { IDoctorInfoRepository } from '../../repositories/IDoctorInfoRepository'

type DoctorInfoRequest = {
  price: number
  duration: number
  doctorId: string
}

type DoctorInfoResponse = Either<InvalidDoctorError, DoctorInfo>

export class DoctorInfoUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}

  async execute({
    price,
    duration,
    doctorId,
  }: DoctorInfoRequest): Promise<DoctorInfoResponse> {
    const doctorById = await this.doctorRepository.findById(doctorId)

    if (!doctorById) {
      return left(new InvalidDoctorError(doctorId))
    }

    const doctorOrError = DoctorInfo.create({
      price,
      duration,
      doctorId,
    })

    if (doctorOrError.isLeft()) {
      return left(doctorOrError.value)
    }

    const doctorInfo = doctorOrError.value

    await this.doctorInfoRepository.createOrUpdate(doctorInfo)

    return right(doctorInfo)
  }
}
