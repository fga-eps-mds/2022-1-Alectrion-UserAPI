// Validar usuário com email repetido (consultar repositorio de usuario)
// Validar username repetido (consultar repositorio de usuario)
// Caso passe por essas duas verificacoes:
// Fazer hash da senha antes de enviar pro db
// if Sucesso:
// Se o banco criar o usuário, retorna dados do usuario com sanitização (sem a senha)
// Se der errado:
// Tratamento de erros (usuário existe, dados não cadastrados...)

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

export class CreateUserUseCase implements UseCase {
  constructor(
    private readonly encryptor: Encryptor,
    private readonly userRepository: Repository
  ) {}

  async execute(createUserData: CreateUserData): Promise<UseCaseReponse> {
    const userByEmail = await this.userRepository.findOneByEmail(
      createUserData.email
    )
    if (userByEmail !== undefined) {
      return { isSuccess: false, data: { message: 'email já utilizado' } }
    }

    const userByUsername = await this.userRepository.findOneByUsername(
      createUserData.username
    )
    if (userByUsername !== undefined) {
      return { isSuccess: false, data: { message: 'username já utilizado' } }
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
        data: { message: 'Não foi possível criar o usuário' }
      }
    }
  }
}
