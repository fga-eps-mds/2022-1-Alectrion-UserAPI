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

export class AuthenticateUserUseCase implements UseCase<{ token: string }> {
  constructor(
    private readonly userRepository: Repository,
    private readonly encryptor: Encryptor,
    private readonly token: Token
  ) {}
  async execute(
    userData: DataUserLogin
  ): Promise<UseCaseReponse<{ token: string }>> {
    let userFound = null;
    userFound = await this.userRepository.findToAuthenticate(userData.username);

    if (!userFound) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    let checkPassword;
    try {
      checkPassword = this.encryptor.compare(
        userData.password,
        userFound.password
      );
    } catch (error) {
      console.log("erro abaixo do catch");
      console.log(error);
    }

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginUserError() };
    }
    const tokenRequested = this.token.generateToken(
      {userId : userFound.id,
       role: userFound.role},
      process.env.SECRET_JWT
    );

    return { isSuccess: true, data: { token: tokenRequested } };
  }
}
