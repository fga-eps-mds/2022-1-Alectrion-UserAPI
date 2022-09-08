import { mock } from 'jest-mock-extended'
import {
  UpdateUserError,
  UpdateUserUseCase
} from '../../useCase/updateUser/updateUserUseCase'
import { UpdateUserControler } from './updateUserController'
import { datatype } from 'faker'
import { ServerError } from '../errors'
const upadateUserUseCaseMocked = mock<UpdateUserUseCase>()
const upadateUserController = new UpdateUserControler(upadateUserUseCaseMocked)

const request = {
  userId: datatype.string(),
  name: datatype.string(),
  email: datatype.string(),
  username: datatype.string(),
  jobFunction: 'GENERICO',
  role: 'BASICO',
  password: datatype.string()
}

describe('Should test update user controller', () => {
  it('Should update user with success', async () => {
    const useCaseReponseMock = {
      isSuccess: true,
      data: { message: 'Usuário atualizado!' }
    }
    upadateUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 200,
      data: useCaseReponseMock.data
    }

    const response = await upadateUserController.perform(request)

    expect(response).toEqual(controllerReponseExpected)
    expect(upadateUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(upadateUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return bad request when fail update', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new UpdateUserError()
    }
    upadateUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await upadateUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(upadateUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(upadateUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return server errir whrn fail ', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    upadateUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await upadateUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
  })
})
