import { GetUserUseCase, GetUserError, FindUserInput } from "./getUserUseCase";
import { mock } from "jest-mock-extended";
import { Repository } from "../../repository/protocol/repository";
import { User } from "../../domain/entities/user";
import { Job } from "../../db/entities/userEnum/job";
import { Role } from "../../db/entities/userEnum/role";
import { datatype } from "faker";

const mockedUser: User = {
  id: datatype.string(),

  name: datatype.string(),

  email: datatype.string(),

  username: datatype.string(),
  
  job: Job.DELEGADO,

  role: Role.ADMIN,

  password: datatype.string(),

  createdAt: new Date(),

  updatedAt: new Date(),
};

const repositoryMocked = mock<Repository>();
const getUserUseCase = new GetUserUseCase(repositoryMocked);

describe("Should test user use case to get user", () => {
  it("should return an use with success when search by a userName", async () => {
    const mockedData = {
      userName: "pedro",
    };
    repositoryMocked.findOneByUsername.mockResolvedValue(mockedUser);
    const result = await getUserUseCase.execute(mockedData);
    expect(result).toEqual({ isSuccess: true, data: mockedUser });
  });

  it("should return an use with success when search by a email", async () => {
    const mockedData = {
      email: "joaopedro@email.com",
    };
    repositoryMocked.findOneByEmail.mockResolvedValue(mockedUser);
    const result = await getUserUseCase.execute(mockedData);
    expect(result).toEqual({ isSuccess: true, data: mockedUser });
  });
});
