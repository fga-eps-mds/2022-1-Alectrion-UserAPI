import { mock } from 'jest-mock-extended'
import {
  GetUserError,
  GetUserUseCase
} from '../../useCase/getUser/getUserUseCase'
import { datatype } from 'faker'
import { ServerError } from '../errors'
import { GetUserController } from './getUserController'

const getUserUseCaseMocked = mock<GetUserUseCase>()
const getUserController = new GetUserController(getUserUseCaseMocked)

const request = {
  userId: datatype.string()
}

describe('Should test get user controller', () => {
  it('Should return bad request when fail searching', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new GetUserError()
    }
    getUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 400,
      data: useCaseReponseMock.error
    }

    const response = await getUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
    expect(getUserUseCaseMocked.execute).toBeCalledTimes(1)
    expect(getUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })

  it('Should return server error when fail ', async () => {
    const useCaseReponseMock = {
      isSuccess: false,
      error: new ServerError()
    }
    getUserUseCaseMocked.execute.mockResolvedValue(useCaseReponseMock)

    const controllerReponseExpected = {
      statusCode: 500,
      data: useCaseReponseMock.error
    }

    const response = await getUserController.perform(request)
    expect(response).toEqual(controllerReponseExpected)
  })
})
