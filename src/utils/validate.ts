import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { HttpException } from './HttpException'

const validate =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)
      return next()
    } catch (error) {
      return next(new HttpException(400, (error as Error).message))
    }
  }

export default validate
