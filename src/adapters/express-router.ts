import { Controller } from '../presentation/protocols/controller'

import { RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({
    ...req.query,
    ...req.body
  })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
