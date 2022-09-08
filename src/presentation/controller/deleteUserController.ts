import {
  DeleteUserError,
  DeleteUserUseCase
} from '../../useCase/deleteUser/deleteUserUseCase'
import { BadRequestError } from '../errors'
import { HttpResponse, ok, badRequest, serverError } from '../helpers'
import { Controller } from '../protocols/controller'

type Model =
  | Error
  | {
      message: string
    }

export interface DeleteUserData {
  userId: string
}
export class DeleteUserControler extends Controller {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {
    super()
  }

  async perform(httpRequest: DeleteUserData): Promise<HttpResponse<Model>> {
    const user = httpRequest
    const response = await this.deleteUserUseCase.execute(user)

    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof DeleteUserError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}
