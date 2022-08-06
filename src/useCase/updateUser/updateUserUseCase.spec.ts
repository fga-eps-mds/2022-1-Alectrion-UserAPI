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

describe('Teste caso de uso atualização de usuário', () => {
  it('Deve atualizar um usuário com sucesso', async () => {
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

  it('Deve falhar ao atualizar usuário.', async () => {
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
