

import { UseCase, UseCaseReponse } from "../protocols/useCase";
import { Repository } from "../../repository/protocol/repository"
import UserRepository from "../../repository/userRepository"
interface UpadateUserData {
    userId: string;
    name?: string;
    email?: string;
    username?: string;
    jobFunction?: string;
    password?: string;
}

class UpdateUserUseCase implements UseCase {
    private userRepository: Repository;
    constructor() {
        this.userRepository = new UserRepository();
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


export default UpdateUserUseCase ;