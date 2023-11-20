import { Appointment as PersistenceAppointment } from '@prisma/client'
import { Appointments } from '../domain/appointments/appointments'

export class AppointmentMapper {
  static toDomain(raw: PersistenceAppointment): Appointments {
    const appointmentOrError = Appointments.create(
      {
        doctorId: raw.doctor_id,
        patientId: raw.patient_id,
        date: raw.date,
        note: raw.note,
        isFinished: raw.is_finished,
      },
      raw.id
    )

    return appointmentOrError
  }

  static toPersistence(appointment: Appointments) {
    return {
      id: appointment.id,
      doctor_Id: appointment.doctorId,
      patient_Id: appointment.patientId,
      date: appointment.date,
      note: appointment.note,
      is_Finished: appointment.isFinished,
    }
  }
}
