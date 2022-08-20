import { Repository } from "../../repository/protocol/repository";
import UserRepository from "../../repository/userRepository";
import { BcryptAdapter } from "../../adapters/bcryptAdapter";
import { AuthenticateUserUseCase } from "../../useCase/authenticationUser/authenticationUserUseCase";
import { CreateToken } from "../../adapters/tokenAdapter";

export const makeAuthenticationUser = ()=>{
    const userRepository = new UserRepository()
    const encryptor = new BcryptAdapter()
    const token = new CreateToken()
    return new AuthenticateUserUseCase(userRepository, encryptor, token)
}