import { BcryptAdapter } from './bcryptAdapter'
import { hashSync } from 'bcrypt'

jest.mock('bcrypt')

const mockedDependency = jest.mocked(hashSync)

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter
  beforeEach(() => {
    sut = new BcryptAdapter()
  })
  it('should call BcryptAdapter with correct params', () => {
    mockedDependency.mockReturnValue('value')
    sut.encrypt('any_password')

    expect(mockedDependency).toHaveBeenCalledTimes(1)
    expect(mockedDependency).toHaveBeenCalledWith('any_password', 3)
  })
})
