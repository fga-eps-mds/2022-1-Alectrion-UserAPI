import { UserAlreadyExistsError } from './../../useCase/createUser/createUserUseCase'
import { Controller } from '../protocols/controller'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'
import { Job } from '../../domain/entities/user'

type HttpRequest = {
  name: string
  email: string
  username: string
  jobFunction: Job
  password: string
}
type Model =
  | Error
  | {
      email: string
      job: string
    }

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const user = params
    const response = await this.createUser.execute(user)
    if (response.isSuccess && response.data) {
      return ok(response.data)
    } else {
      if (response.error instanceof UserAlreadyExistsError) {
        return badRequest(new BadRequestError(response.error.message))
      } else return serverError(response.error)
    }
  }
}
