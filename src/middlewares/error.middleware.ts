import express, { ErrorRequestHandler, Request, Response } from 'express'
import { HttpException } from '../utils/HttpException'
import logger from '../utils/logger'

const notFoundHandler = (_: Request, res: Response) => {
  return res
    .status(404)
    .json({ status: 404, success: false, error: 'Not Found' })
}

const errorHandler: ErrorRequestHandler = (
  error: HttpException,
  _req,
  res,
  _next,
) => {
  const status: number = error.status || 500
  const message: string = error.message || 'Something went wrong'
  logger.error(error)
  return res.status(status).json({
    status: status,
    success: false,
    error: message,
  })
}

export default ({ app }: { app: express.Application }) => {
  app.use(errorHandler)
  app.use(notFoundHandler)
}
