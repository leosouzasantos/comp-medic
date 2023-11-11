import { Either } from '../../../../core/logic/Either'
import { DoctorEntity } from '../../entities/DoctorEntity'

interface IDoctorInfoProps {
  startAt: string
  endAt: string
  price: number
  duration: number
  doctorId: string
}

export class DoctorInfo extends DoctorEntity<IDoctorInfoProps> {
  get startAt() {
    return this.props.startAt
  }
  get endAt() {
    return this.props.endAt
  }
  get price() {
    return this.props.price
  }
  get duration() {
    return this.props.duration
  }

  get doctorId() {
    return this.props.doctorId
  }

  private constructor(props: IDoctorInfoProps, id?: string) {
    super(props, id)
  }

  //static create(props: IDoctorInfoProps, id?: string)
}
