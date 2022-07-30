import { dataSource } from "../db/config";
import { User } from "../db/entities/user";
import { Repository } from "./protocol/repository";

class UserRepository implements Repository {
  private readonly userRepository;
  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  async updateOne(userData: any): Promise<Boolean> {
    const updateUserData = Object.assign({}, userData);
    delete updateUserData.userId;
    let updateUser = await this.userRepository.update(
      userData.userId,
      updateUserData
    );
    return true;
  }
  async findOne(userId: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
export default  UserRepository ;
