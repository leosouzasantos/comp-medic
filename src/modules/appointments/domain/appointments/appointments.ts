import { Entity } from '../../../../core/domain/Entity'
import { right } from '../../../../core/logic/Either'

interface IAppointmentsProps {
  patientId: string
  doctorId: string
  date: Date
}

export class Appointments extends Entity<IAppointmentsProps> {
  get patientId() {
    return this.props.patientId
  }

  get doctorId() {
    return this.props.doctorId
  }

  get date() {
    return this.props.date
  }

  private constructor(props: IAppointmentsProps, id?: string) {
    super(props, id)
  }

  static create(props: IAppointmentsProps, id?: string) {
    const appointments = new Appointments(props, id)
    return right(appointments)
  }
}
