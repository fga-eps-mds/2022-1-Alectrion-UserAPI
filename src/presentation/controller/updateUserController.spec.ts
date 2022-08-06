import { mock } from 'jest-mock-extended'
import {
  UpadteUserError,
  UpdateUserUseCase
} from '../../useCase/updateUser/updateUserUseCase'
import { UpdateUserControler } from './updateUserController'
import { datatype } from 'faker'
import { ServerError } from '../errors'
const upadateUserUseCaseMocked = mock<UpdateUserUseCase>()
const upadateUserController = new UpdateUserControler(upadateUserUseCaseMocked)
describe('Teste controller atualização de usuário', () => {
  it('Deve retonar ok', async () => {
    const request = {
      userId: datatype.string(),
      name: datatype.string(),
      email: datatype.string(),
      username: datatype.string(),
      jobFunction: datatype.string(),
      password: datatype.string()
    }
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

  it('Deve retonar 400 quando requisicao ruim', async () => {
    const request = {
      userId: datatype.string(),
      name: datatype.string(),
      email: datatype.string(),
      username: datatype.string(),
      jobFunction: datatype.string(),
      password: datatype.string()
    }
    const useCaseReponseMock = {
      isSuccess: false,
      error: new UpadteUserError()
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

  it('Deve retonar 500 quando o servidor não precessar', async () => {
    const request = {
      userId: datatype.string(),
      name: datatype.string(),
      email: datatype.string(),
      username: datatype.string(),
      jobFunction: datatype.string(),
      password: datatype.string()
    }
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
    console.log('Response: ', response)
    expect(response).toEqual(controllerReponseExpected)
    // expect(upadateUserUseCaseMocked.execute).toBeCalledTimes(1)
    // expect(upadateUserUseCaseMocked.execute).toHaveBeenCalledWith(request)
  })
})
