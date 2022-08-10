import UserRepository from '../../repository/userRepository'
import { GetUserByIdUseCase, GetUserByEmailUseCase, GetUserByUsernameUseCase } from '../../useCase/getUser/getUserUseCase'

export const makeGetUserById = ()=>{
    const userRepository = new UserRepository()
    return new GetUserByIdUseCase(userRepository)
}

export const GetUserByEmail = ()=>{
    const userRepository = new UserRepository()
    return new GetUserByEmailUseCase(userRepository)
}


export const GetUserByUsername = ()=>{
    const userRepository = new UserRepository()
    return new GetUserByUsernameUseCase(userRepository)
}





