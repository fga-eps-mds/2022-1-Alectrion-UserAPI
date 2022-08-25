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

export class AuthenticateUserUseCase
  implements
    UseCase<{
      token: string;
      expireIn: string;
      email: string;
      name: string;
      role: string;
    }>
{
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor,
    private readonly token: Token
  ) {}
  async execute(
    userData: DataUserLogin
  ): Promise<
    UseCaseReponse<{
      token: string;
      expireIn: string;
      email: string;
      name: string;
      role: string;
    }>
  > {
    let userFound = null;
    userFound = await this.userRepository.findToAuthenticate(userData.username);

    if (!userFound) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    let checkPassword;

    checkPassword = this.encryptor.compare(
      userData.password,
      userFound.password
    );

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    const timeTokenExpire = "1800s";
    const tokenRequested = this.token.generateToken(
      { userId: userFound.id, role: userFound.role },
      process.env.SECRET_JWT,
      {
        expiresIn: timeTokenExpire,
      }
    );

    return {
      isSuccess: true,
      data: {
        token: tokenRequested,
        expireIn: timeTokenExpire,
        email: userFound.email,
        name: userFound.name,
        role: userFound.role,
      },
    };
  }
}
