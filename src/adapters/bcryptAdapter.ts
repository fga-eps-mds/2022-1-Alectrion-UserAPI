import { compare, hashSync } from "bcrypt";
import { Encryptor } from "../services/encryptor";

export class BcryptAdapter implements Encryptor {
  compare(passwordLogin: string, passwordDB: string):boolean {
    let compareResult =  compare(passwordLogin, passwordDB )
    if(!compareResult){
      return true;
    }
    return false;
  }
  encrypt(password: string) {
    return hashSync(password, 3);
  }
}
