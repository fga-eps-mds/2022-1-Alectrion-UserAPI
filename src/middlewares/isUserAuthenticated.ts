import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Role } from "../db/entities/userEnum/role";

interface PayLoad {
  userId: string;
  role: string;
}
const secret = process.env.SECRET_JWT || ""
export function IsUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const {userId, role} = verify(token, secret) as PayLoad
    if(role != Role.ADMIN){
      console.log(role)
      return res.status(401).end();
    }
    return next()

  } catch (error) {
    console.log(error)
    return res.status(401).end();
  }
}
