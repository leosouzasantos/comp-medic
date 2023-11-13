import { Controller } from '../../../../core/infra/Controller'
import { PrismaDoctorInfoRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorInfoRepository'
import { PrismaDoctorRepository } from '../../../../modules/doctor/repositories/prisma/PrismaDoctorRepository'
import { DoctorInfoController } from '../../../../modules/doctor/useCases/DoctorInfo/DoctorInfoController'
import { DoctorInfoUseCase } from '../../../../modules/doctor/useCases/DoctorInfo/DoctorInfoUseCase'

export function MakeCreateDoctorInfoController(): Controller {
  const doctorRepository = new PrismaDoctorRepository()
  const doctorInfoRepository = new PrismaDoctorInfoRepository()

  const doctorInfo = new DoctorInfoUseCase(
    doctorRepository,
    doctorInfoRepository
  )

  const doctorInfoController = new DoctorInfoController(doctorInfo)

  return doctorInfoController
}
