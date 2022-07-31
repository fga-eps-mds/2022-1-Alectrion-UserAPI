import { Controller } from '../protocols/controller'
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'

export class CreateUserController implements Controller {
  constructor(private readonly createUser: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    console.log('teste', this.createUser)

    const user = req.body
    console.log('Body: ', user)
    const response = await this.createUser.execute(user)
    return response.isSuccess
      ? res.status(200).json(response.data)
      : res.status(500).json({ error: response.data.message })
  }
}
