
export interface  Token{
    generateToken(payload: object, secret: any): string
}


