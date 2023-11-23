import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySpecialityRepository } from '../../../speciality/repositories/in-memory/InMemorySpecialityRepository'
import { InMemoryUserRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository.ts'
import { InMemoryDoctorRepository } from '../../repositories/in-memory/InMemoryDoctorRepository'
import { User } from '../../../users/domain/user/user'
import { Username } from '../../../users/domain/user/username'
import { Name } from '../../../users/domain/user/name'
import { Name as SpecialityName } from '../../../speciality/domain/speciality/name'
import { Password } from '../../../users/domain/user/password'
import { CreateDoctor } from './CreateDoctorUseCase'
import { Crm } from '../../domain/doctor/crm'
import { Email } from '../../domain/doctor/email'
import { Speciality } from '../../../speciality/domain/speciality/speciality'
import { Description } from '../../../speciality/domain/speciality/description'

let specialityRepository: InMemorySpecialityRepository
let userRepository: InMemoryUserRepository
let doctorRepository: InMemoryDoctorRepository
let createDoctor: CreateDoctor

const crm = Crm.create('654321').value as Crm

const email = Email.create('JohnDoe@example.com').value as Email

describe('Create Doctor', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    specialityRepository = new InMemorySpecialityRepository()
    doctorRepository = new InMemoryDoctorRepository()

    createDoctor = new CreateDoctor(
      userRepository,
      specialityRepository,
      doctorRepository
    )
  })

  it('should be able to create new doctor', async () => {
    const user = User.create({
      username: Username.create('JohnDoe').value as Username,
      name: Name.create('John Doe').value as Name,
      password: Password.create('12345678').value as Password,
    }).value as User

    await userRepository.create(user)

    const speciality = Speciality.create({
      name: SpecialityName.create('Spec_Name').value as SpecialityName,
      description: Description.create('Spec_Desc').value as Description,
    }).value as Speciality

    await specialityRepository.create(speciality)

    const response = await createDoctor.execute({
      crm: crm.value,
      email: email.value,
      userId: user.id,
      specialityId: speciality.id,
    })

    expect(response.isRight()).toBeTruthy()
  })
})
