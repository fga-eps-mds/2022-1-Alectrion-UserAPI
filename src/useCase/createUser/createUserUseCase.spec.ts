import {
  CreateUserData,
  CreateUserError,
  CreateUserUseCase,
  UserAlreadyExistsError
} from './createUserUseCase'
import { MockProxy, mock } from 'jest-mock-extended'
import { Encryptor } from '../../services/encryptor'
import { Repository } from '../../repository/protocol/repository'
import { Job, Role } from '../../domain/entities/user'

describe('CreateUserUseCase', () => {
  let sut: CreateUserUseCase
  let encryptor: MockProxy<Encryptor>
  let userRepository: MockProxy<Repository>
  const body: CreateUserData = {
    name: 'teste',
    email: 't@t.com',
    username: 'testador',
    jobFunction: 'GENERIC',
    password: 'testando'
  }
  beforeEach(() => {
    userRepository = mock()
    encryptor = mock()
    sut = new CreateUserUseCase(encryptor, userRepository)
    userRepository.findOneByEmail.mockResolvedValue(undefined)
    userRepository.findOneByUsername.mockResolvedValue(undefined)
    userRepository.createUser.mockResolvedValue({
      name: 'teste',
      email: 't@t.com',
      password: 'any_password',
      username: 'testador',
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.DEL,
      role: Role.ADMIN
    })
  })

  it('should call findUserByEmail with correct values', async () => {
    await sut.execute(body)

    expect(userRepository.findOneByEmail).toHaveBeenCalledWith(body.email)
    expect(userRepository.findOneByEmail).toBeCalledTimes(1)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    userRepository.findOneByEmail.mockResolvedValueOnce({
      name: 'name',
      email: 't@t.com',
      password: 'any_password',
      username: 'any_username',
      id: 'any_email',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.DEL,
      role: Role.ADMIN
    })

    const result = await sut.execute(body)
    expect(result.data).toBeUndefined()
    expect(result.error).toEqual(
      new UserAlreadyExistsError('email já utilizado')
    )
    expect(userRepository.findOneByUsername).toBeCalledTimes(0)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    userRepository.findOneByUsername.mockResolvedValueOnce({
      name: 'name',
      email: 't@t.com',
      password: 'any_password',
      username: 'any_username',
      id: 'any_email',
      createdAt: new Date(),
      updatedAt: new Date(),
      job: Job.DEL,
      role: Role.ADMIN
    })

    const result = await sut.execute(body)

    expect(result.error).toEqual(
      new UserAlreadyExistsError('username já utilizado')
    )
    expect(userRepository.findOneByUsername).toBeCalledTimes(1)
  })

  it('should return UserAlreadyExistsError if userRepository returns data', async () => {
    await sut.execute(body)

    expect(encryptor.encrypt).toBeCalledTimes(1)
    expect(encryptor.encrypt).toBeCalledWith(body.password)
  })

  it('should return CreateUserError if userRepository CreateUser returns undefined', async () => {
    userRepository.createUser.mockResolvedValue(undefined)
    const result = await sut.execute(body)

    expect(result.error).toEqual(new CreateUserError())
    expect(result.isSuccess).toBeFalsy()
    expect(result.data).toBeUndefined()
  })
})
