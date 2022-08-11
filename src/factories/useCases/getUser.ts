import UserRepository from '../../repository/userRepository'
import { GetUserUseCase } from '../../useCase/getUser/getUserUseCase'

export const makeGetUser = ()=>{
    const userRepository = new UserRepository()
    return new GetUserUseCase(userRepository)
}






