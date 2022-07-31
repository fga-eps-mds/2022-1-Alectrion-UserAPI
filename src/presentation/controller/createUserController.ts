import { Controller } from '../protocols/controller'
import { UseCase } from '../../useCase/protocols/useCase'
import { Request, Response } from 'express'

class CreateUserController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    const user = req.body
    console.log('Body: ', user)
    const response = await this.useCase.execute(user)
    return response.isSuccess
      ? res.status(200).json(response.data)
      : res.status(500).json({ error: response.data.message })
  }
}

export default CreateUserController
