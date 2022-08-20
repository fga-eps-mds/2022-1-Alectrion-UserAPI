import { Controller } from "../protocols/controller";
import { AuthenticateUserUseCase } from "../../useCase/authenticationUser/authenticationUserUseCase";
import { badRequest, HttpResponse, ok, serverError } from '../helpers'
import { BadRequestError } from '../errors'
import { UpdateUserUseCase } from "../../useCase/updateUser/updateUserUseCase";

type HttpRequest = {
  username: string,
  password: string
}

type Model =
  | Error
  | { 
      token: string
    }

    export class AuthenticationUserController extends Controller {
     
      constructor(private authenticateUserUseCase : AuthenticateUserUseCase) {
        super()
      }    

      async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
        const response = await this.authenticateUserUseCase.execute(params)
        if(response.isSuccess && response.data){
          console.log("token abaixo")
          console.log(response.data.token)
          return ok(response.data.token)
        }
        return serverError(response.error)
      }

    }