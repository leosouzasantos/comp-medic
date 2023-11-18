import { DoctorSchedule } from '../domain/doctorSchedule/doctorSchedule'
import { DoctorScheduleWeek } from '../mappers/DoctorSchedulesMapper'

export interface IDoctorScheduleRepository {
  create(doctorSchedule: DoctorSchedule): Promise<void>
  findByDoctorIdAndDayOfWeek(
    doctorId: string,
    dayOfWeek: number
  ): Promise<DoctorScheduleWeek | null>
}
