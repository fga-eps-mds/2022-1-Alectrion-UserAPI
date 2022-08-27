import { dataSource } from '../db/config'
import { User } from '../db/entities/user'
import { Role } from '../db/entities/userEnum/role'
import { Job } from '../db/entities/userEnum/job'
import { Repository } from './protocol/repository'

class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async updateOne(userData: any): Promise<boolean> {
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

  async findAll(): Promise<any> {
    const users = await this.userRepository.find()
    return users
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
    job: Job
    role: Role
    password: string
  }): Promise<User | undefined> {
    const { name, email, password, username, job, role } = params

    const user = this.userRepository.create({
      name,
      email: email !== '' ? email : undefined,
      password,
      username,
      job: job ?? Job.GENERICO,
      role: role ?? Role.BASICO
    })

    await this.userRepository.save(user)
    return user
  }
}
export default UserRepository
