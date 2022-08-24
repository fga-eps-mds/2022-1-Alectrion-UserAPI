import { CreateToken } from './tokenAdapter'
import * as jsonwebtoken from 'jsonwebtoken'
import {datatype} from 'faker'

jest.mock('jsonwebtoken')

describe('shoul test token adapter', () => {
  it('should return a token', () => {
    const mockedToken = datatype.string();
    const payload = {userId: datatype.string(), role: datatype.string()}
    const secret = datatype.string();
    const spySign = jest.spyOn(jsonwebtoken, 'sign').mockImplementation((a, b, c) => {
      return mockedToken
    })
    const adapter = new CreateToken()
    const responseToken = adapter.generateToken(payload, secret, {})
    expect(responseToken).toEqual(mockedToken)
    expect(spySign).toHaveBeenCalledWith(payload, secret, {})
   
  })
})