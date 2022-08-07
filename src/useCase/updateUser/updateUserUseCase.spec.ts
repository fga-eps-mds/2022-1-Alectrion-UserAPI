import { mock } from 'jest-mock-extended'
import { Repository } from '../../repository/protocol/repository'
import {
  UpdateUserUseCase,
  UpadteUserError,
  UpadateUserData
} from './updateUserUseCase'
import { datatype } from 'faker'

const repositoryMocked = mock<Repository>()
const updateUserUseCase = new UpdateUserUseCase(repositoryMocked)

describe('Should test use case update user', () => {
  it('Should update use with success', async () => {
    repositoryMocked.updateOne.mockResolvedValue(true)
    const upadetUserData: UpadateUserData = {
      userId: datatype.uuid(),
      name: datatype.string(),
      password: datatype.string()
    }

    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Usuário atualizado!' }
    }
    const updateUserResult = await updateUserUseCase.execute(upadetUserData)
    expect(updateUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toHaveBeenCalledTimes(1)
  })

  it('Should fail when update user.', async () => {
    repositoryMocked.updateOne.mockResolvedValue(false)
    const upadetUserData: UpadateUserData = {
      userId: datatype.uuid(),
      name: datatype.string(),
      password: datatype.string()
    }

    const expectedResponse = {
      isSuccess: false,
      error: new UpadteUserError()
    }
    const updateUserResult = await updateUserUseCase.execute(upadetUserData)
    expect(updateUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.updateOne).toHaveBeenCalledTimes(1)
  })
})
