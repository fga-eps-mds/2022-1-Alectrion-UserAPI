import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'

export interface UpdateUserData {
  userId: string
  name?: string
  email?: string
  username?: string
  jobFunction?: string
  password?: string
}

export class UpdateUserError extends Error {
  constructor() {
    super('Não foi possivel atualizar o usuário.')
    this.name = 'UpadteUserError'
  }
}

export class UpdateUserUseCase implements UseCase<{ message: string }> {
  constructor(private readonly userRepository: Repository) {}

  async execute(
    userUpdate: UpdateUserData
  ): Promise<UseCaseReponse<{ message: string }>> {
    return (await this.userRepository.updateOne(userUpdate))
      ? { isSuccess: true, data: { message: 'Usuário atualizado!' } }
      : {
          isSuccess: false,
          error: new UpdateUserError()
        }
  }
}
