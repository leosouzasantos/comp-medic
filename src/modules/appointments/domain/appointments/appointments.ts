import { Entity } from '../../../../core/domain/Entity'

interface IAppointmentsProps {
  patientId: string
  doctorId: string
  date: Date
  note?: any
  isFinished: boolean
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

  get isFinished() {
    return this.props.isFinished
  }

  get note() {
    return this.props.note
  }

  private constructor(props: IAppointmentsProps, id?: string) {
    super(props, id)
  }

  static create(props: IAppointmentsProps, id?: string): Appointments {
    const appointments = new Appointments(props, id)
    return appointments
  }
}
