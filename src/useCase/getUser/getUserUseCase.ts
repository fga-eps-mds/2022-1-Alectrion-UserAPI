import { UseCase, UseCaseReponse } from "../protocols/useCase";
import { Repository } from "../../repository/protocol/repository";
import { User } from "../../domain/entities/user";

export class GetUserError extends Error {
  constructor() {
    super("Não foi possivel encontrar o usuar.");
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
