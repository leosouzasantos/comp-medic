import { beforeEach, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryUserRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository.ts'
import { InMemoryDoctorRepository } from '../../repositories/in-memory/InMemoryDoctorRepository'
import { DoctorRequest, CreateDoctor } from './CreateDoctorUseCase'
import { IDoctorRepository } from '../../repositories/IDoctorRepository.js'

describe('Create Doctor', () => {
  it('Should be able to create a new Doctor', async () => {
    const doctorMock: DoctorRequest = {
      username: 'JohnDoe',
      name: 'John Doe',
      password: '12345678',
      email: 'johndoe@example.com',
      crm: '123456',
      specialityId: randomUUID(),
    }

    const userRepository = new InMemoryUserRepository()
    const doctorRepository = new InMemoryDoctorRepository()

    const createDoctorUseCase = new CreateDoctor(
      userRepository,
      doctorRepository
    )

    const doctorCreated = await createDoctorUseCase.execute(doctorMock)
    expect(doctorCreated.isRight).toHaveProperty('id')
  })
})
