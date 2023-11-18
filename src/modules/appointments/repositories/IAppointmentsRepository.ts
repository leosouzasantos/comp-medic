export type AppointmentsDate = {
  date: Date
}

export interface IAppointmentsRepository {
  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>
}
