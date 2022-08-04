import { Controller } from '../protocols/controller'
import { UseCase } from '../../useCase/protocols/useCase'
import { Request, Response } from 'express'
import UpdateUserUseCase from '../../useCase/updateUser/updateUserUseCase'

class UpdateUserControler implements Controller {
  private useCase: UseCase
  constructor() {
    this.useCase = new UpdateUserUseCase()
  }

  async handle(req: Request, res: Response): Promise<any> {
    const user = req.body
    console.log('Body: ', user)
    const response = await this.useCase.execute(user)
    return response.isSuccess
      ? res.status(200).json(response.data)
      : res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}

export default new UpdateUserControler()