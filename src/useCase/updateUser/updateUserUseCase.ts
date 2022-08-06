import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'

export interface UpadateUserData {
  userId: string
  name?: string
  email?: string
  username?: string
  jobFunction?: string
  password?: string
}

export class UpadteUserError extends Error {
  constructor() {
    super('Não foi possivel atualizar o usuário.')
    this.name = 'UpadteUserError'
  }
}

export class UpdateUserUseCase implements UseCase<{ message: string }> {
  constructor(private readonly userRepository: Repository) {}

  async execute(
    userUpadate: UpadateUserData
  ): Promise<UseCaseReponse<{ message: string }>> {
    return (await this.userRepository.updateOne(userUpadate))
      ? { isSuccess: true, data: { message: 'Usuário atualizado!' } }
      : {
          isSuccess: false,
          error: new UpadteUserError()
        }
  }
}
