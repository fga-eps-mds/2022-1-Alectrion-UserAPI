import { datatype } from 'faker'
import { mock } from 'jest-mock-extended'
import { Repository } from '../../repository/protocol/repository'
import {
  DeleteUserData,
  DeleteUserError,
  DeleteUserUseCase
} from './deleteUserUseCase'

const repositoryMocked = mock<Repository>()
const deleteUserUseCase = new DeleteUserUseCase(repositoryMocked)

describe('Should test conditions for soft delete', () => {
  it('Should succesfully delete a user', async () => {
    repositoryMocked.deleteOne.mockResolvedValue()
    const deleteUserData: DeleteUserData = {
      userId: datatype.uuid()
    }

    const expectedResponse = {
      isSuccess: true,
      data: { message: 'Usuário deletado com sucesso' }
    }

    const deleteUserResult = await deleteUserUseCase.execute(deleteUserData)
    expect(deleteUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.deleteOne).toHaveBeenCalledTimes(1)
  })

  it('Should fail when user not found.', async () => {
    const deleteUserData = {}

    const expectedResponse = {
      isSuccess: false,
      error: new DeleteUserError()
    }
    const deleteUserResult = await deleteUserUseCase.execute(deleteUserData)
    expect(deleteUserResult).toEqual(expectedResponse)
    expect(repositoryMocked.deleteOne).toHaveBeenCalledTimes(1)
  })
})
