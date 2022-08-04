import { UseCase, UseCaseReponse } from '../protocols/useCase'
import { Repository } from '../../repository/protocol/repository'
import { Encryptor } from '../../services/encryptor'
import { Job } from '../../domain/entities/user'
interface CreateUserData {
  name: string
  email: string
  username: string
  jobFunction: Job
  password: string
}

export class UserAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserAlreadyExists'
  }
}

export class CreateUserError extends Error {
  constructor() {
    super('Não foi possível criar o usuário')
    this.name = 'UserAlreadyExists'
  }
}

export class CreateUserUseCase
  implements UseCase<{ email: string; job: string }>
{
  constructor(
    private readonly encryptor: Encryptor,
    private readonly userRepository: Repository
  ) {}

  async execute(
    createUserData: CreateUserData
  ): Promise<UseCaseReponse<{ email: string; job: string }>> {
    const userByEmail = await this.userRepository.findOneByEmail(
      createUserData.email
    )

    if (userByEmail !== undefined) {
      return {
        isSuccess: false,
        error: new UserAlreadyExistsError('email já utilizado')
      }
    }

    const userByUsername = await this.userRepository.findOneByUsername(
      createUserData.username
    )
    if (userByUsername !== undefined) {
      return {
        isSuccess: false,
        error: new UserAlreadyExistsError('username já utilizado')
      }
    }
    const hashedPassword = this.encryptor.encrypt(createUserData.password)

    const user = await this.userRepository.createUser({
      name: createUserData.name,
      password: hashedPassword,
      email: createUserData.email,
      username: createUserData.username,
      job: createUserData.jobFunction === 'admin' ? Job.DEL : Job.GENERIC
    })
    if (user !== undefined) {
      return { isSuccess: true, data: { email: user.email, job: user.job } }
    } else {
      return {
        isSuccess: false,
        error: new CreateUserError()
      }
    }
  }
}
