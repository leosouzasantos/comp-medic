import { DoctorSchedule } from '../domain/doctorSchedule/doctorSchedule'

export interface IDoctorScheduleRepository {
  create(doctorSchedule: DoctorSchedule): Promise<void>
}
