import * as fastq from 'fastq'
import type { queue, done } from 'fastq'
import { NoitificationTask, notificiationAppointmentWorker } from './worker'

const queueAppointmentNotification: queue<NoitificationTask> = fastq.promise(
  notificiationAppointmentWorker,
  1
)

export { queueAppointmentNotification }
