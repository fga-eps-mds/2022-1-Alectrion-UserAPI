import { dataSource } from '../db/config'
import { User } from '../db/entities/user'
import { Job } from '../domain/entities/user'
import { Repository } from './protocol/repository'

class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async updateOne(userData: any): Promise<Boolean> {
    const updateUserData = Object.assign({}, userData)
    delete updateUserData.userId
    await this.userRepository.update(userData.userId, updateUserData)
    return true
  }

  async findOne(userId: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: userId
    })
    if (!user) {
      return null
    }
    return user
  }

  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      email
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async findOneByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      username
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async createUser(params: {
    name: string
    email: string
    username: string
    job?: Job
    password: string
  }): Promise<User | undefined> {
    const { name, email, password, username } = params

    const user = this.userRepository.create({
      name,
      email,
      password,
      username
    })
    this.userRepository.save(user)
    return user
  }
}
export default UserRepository
