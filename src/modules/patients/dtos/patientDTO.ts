export type PatientWithUserDTO = {
  id: string
  email: string
  document: string
  userId: string
  user: {
    name: string
  }
}
