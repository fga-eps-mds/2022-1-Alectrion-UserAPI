import { UseCase, UseCaseReponse } from "../protocols/useCase";
import { Repository } from "../../repository/protocol/repository";
import { User } from "../../domain/entities/user";

export class GetUserError extends Error {
  constructor() {
    super("Não foi possivel encontrar o usuário!.");
    this.name = "GetUserError";
  }
}

export class GetUserByIdUseCase implements UseCase<any> {
  constructor(private readonly userRepository: Repository) {}
  async execute(userId: string): Promise<UseCaseReponse<{ user: User }>> {
    return (await this.userRepository.findOne(userId))
      ? { isSuccess: true, data: await this.userRepository.findOne(userId) }
      : {
          isSuccess: false,
          error: new GetUserError(),
        };
  }
}

export class GetUserByEmailUseCase implements UseCase<any> {
    constructor(private readonly userRepository: Repository) {}

    async execute(email: string): Promise<UseCaseReponse<{ user: User }>> {
      return (await this.userRepository.findOne(email))
        ? { isSuccess: true, data: await this.userRepository.findOne(email) }
        : {
            isSuccess: false,
            error: new GetUserError(),
          };
    }
  }


export class GetUserByUsernameUseCase implements UseCase<any> {
    constructor(private readonly userRepository: Repository) {}
    async execute(Username: string): Promise<UseCaseReponse<{ user: User }>> {
      return (await this.userRepository.findOne(Username))
        ? { isSuccess: true, data: await this.userRepository.findOne(Username) }
        : {
            isSuccess: false,
            error: new GetUserError(),
          };
    }
  }
