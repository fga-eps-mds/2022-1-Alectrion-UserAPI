import { Controller } from '../protocols/controller'
import {
  UpadateUserData,
  UpadteUserError,
  UpdateUserUseCase
} from '../../useCase/updateUser/updateUserUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'

type Model =
  | Error
  | {
      message: string
    }

export class UpdateUserControler extends Controller {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  async perform(httpRequest: UpadateUserData): Promise<HttpResponse<Model>> {
    const user = httpRequest
    const response = await this.updateUserUseCase.execute(user)

    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof UpadteUserError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}
