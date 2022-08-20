import { UseCase, UseCaseReponse } from "../protocols/useCase";
import { Repository } from "../../repository/protocol/repository";
import { Encryptor } from "../../services/encryptor";
import { Token } from "../../services/tokenGenerator";

export class LoginUserError extends Error {
  constructor() {
    super("username nao existente no banco!");
    this.name = "GetUserError";
  }
}

export interface DataUserLogin {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase implements UseCase<{ token: String }> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor,
    private readonly token: Token
  ) {}
  async execute(
    userData: DataUserLogin
  ): Promise<UseCaseReponse<{ token: String }>> {
    let userFound = null;
    userFound = await this.userRepository.findOneByUsername(userData.username);

    if (!userFound) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    const checkPassword = this.encryptor.compare(
      userFound.password,
      userData.password
    );

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    const tokenRequested = this.token.generateToken(
      userFound.id,
      process.env.SECRET_JWT
    );

    return { isSuccess: true, data: { token: tokenRequested } };
  }
}
