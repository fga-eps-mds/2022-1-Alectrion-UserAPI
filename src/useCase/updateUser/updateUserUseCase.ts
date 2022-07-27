
//1º buscar um usuario no repository de acordo com um id informado
//2º tenta atualizar um usuario --> verifica os campos passados no body da requisição
//3º caso exista um usuario-> atualizar ele, caso nao exista ->retornar um erro
//4º caso o usuario exista -> retornar sucesso da mudança

// controller -> useCase-> repository


import { UseCase, UseCaseReponse } from "../protocols/useCase";
import { Repository } from "../../repository/protocol/repository"
interface UpadateUserData {
    userId: string;
    name: string;
    email: string;
    username: string;
    jobFunction: string;
    password: string;
}

class UpdateUserUseCase implements UseCase {
    private userRepository: Repository;
    constructor() {
        // this.userRepository = newuserRepository;
    }

    async execute(userUpadate: UpadateUserData): Promise<UseCaseReponse> {

        return await this.userRepository.updateOne(userUpadate) ? {
            isSuccess: true,
            data: { message: "usuario atualizado" }
        }: {
                isSuccess: false,
                data: { error: "usuario não atualizado" }
        };
    }

}


export default UpdateUserUseCase;