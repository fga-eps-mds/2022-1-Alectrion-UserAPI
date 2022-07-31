import { Request, Response } from 'express'

export interface HttpResponse {
  status: Number
  body: any
}

export interface Controller {
  handle(req: Request, res: Response): Promise<any>
}
