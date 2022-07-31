import { Job, User } from '../../domain/entities/user'

export interface Repository {
  createUser(params: {
    name: string
    email: string
    username: string
    jobFunction: Job
    password: string
  }): Promise<User | undefined>
  updateOne(userData: any): Promise<Boolean>
  findOne(userId: string): Promise<any>
  findOneByEmail(email: string): Promise<User | undefined>
  findOneByUsername(username: string): Promise<User | undefined>
}
