export interface Encryptor {
  encrypt(password: string): string
  compare(passwordDB: string, passwordLogin: string): boolean
}
