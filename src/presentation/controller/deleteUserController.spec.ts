import { mock } from 'jest-mock-extended'
import {
  DeleteUserError,
  DeleteUserUseCase
} from '../../useCase/deleteUser/deleteUserUseCase'
import { datatype } from 'faker'
import { ServerError } from '../errors'
import { DeleteUserControler } from './deleteUserController'

const deleteUserUseCaseMocked = mock<DeleteUserUseCase>()
const deleteUserController = new DeleteUserControler(deleteUserUseCaseMocked)

const request = {
  userId: datatype.string()
}

describe('Should test update user controller', () => {
  it('Should delete user with success', async () => {
    const useCaseReponseMock = {
      isSuccess: true,
      data: { message: 'Usuário deletado!' }
    }
    deleteUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 200,
      data: useCaseReponseMock.data
    }

    const response = await deleteUserController.perform(request)

    expect(response).toEqual(controllerReponseExpected)
    expect(deleteUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(deleteUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return bad request when fail deleting', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new DeleteUserError()
    }
    deleteUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await deleteUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(deleteUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(deleteUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return server errir whrn fail ', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    deleteUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await deleteUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
  })
})
