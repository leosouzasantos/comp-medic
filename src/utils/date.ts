import dayjs from 'dayjs'

export function validateTime(time: string) {
  return dayjs(formatDateHour(time)).isValid()
}

export function formatDateHour(time: string) {
  const date = dayjs().format('YYYY-MM-DD')
  const dateTimeFormat = new Date(`${date} ${time}`)

  return dayjs(dateTimeFormat)
}

export function compareEndTimeAfter(startTime: string, endTime: string) {
  return formatDateHour(endTime).isAfter(formatDateHour(startTime))
}

export function getDayOfWeek(date: string) {
  return dayjs(date).day()
}

export function formatDate(date: Date, format: string) {
  return dayjs(date).format(format)
}

export function dateToString(date: Date) {
  return dayjs(date).format('YYYY-MM-DD').toString()
}
