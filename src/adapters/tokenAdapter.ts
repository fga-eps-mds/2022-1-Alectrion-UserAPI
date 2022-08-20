import { sign, Secret, SignOptions } from "jsonwebtoken";
import { Token } from "../services/tokenGenerator";

export class CreateToken implements Token {
  generateToken(payload: object, secret: Secret): string {
    const token = sign(payload, secret);

    return token;
  }
}
