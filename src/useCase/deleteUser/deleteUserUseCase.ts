import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'

export interface DeleteUserData {
  userId: string
}

export class DeleteUserError extends Error {
  constructor() {
    super('Não foi possivel excluir o usuário.')
    this.name = 'DeleteUserError'
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('Não foi possível encontrar o usuário')
    this.name = 'UserNotFoundError'
  }
}

export class DeleteUserUseCase implements UseCase<{ message: string }> {
  constructor(private readonly userRepository: Repository) {}

  async execute(
    user: DeleteUserData
  ): Promise<UseCaseReponse<{ message: string }>> {
    const id = user.userId
    const userExists = await this.userRepository.findOne(id)

    if (!userExists) {
      return {
        isSuccess: false,
        error: new UserNotFoundError()
      }
    }

    await this.userRepository.deleteOne(id)

    return {
      isSuccess: true,
      data: {
        message: 'Usuário deletado com sucesso'
      }
    }
  }
}
