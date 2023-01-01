import { NextFunction, Request, Response } from 'express'
import usersService from '../services/users.service'
import { HttpException } from '../utils/HttpException'

function findOne(req: Request, res: Response) {
  return res.status(200).json({
    status: 200,
    success: true,
    data: {
      name: req.user.name,
      email: req.user.email,
    },
  })
}

async function createOrUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body
    const user = await usersService.createOrUpdate(
      req.user._id,
      req.user.phoneNumber,
      payload,
    )

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        name: user?.name,
        email: user?.email,
      },
    })
  } catch (error) {
    return next(new HttpException(400, 'Bad Request'))
  }
}

export default { findOne, createOrUpdate }
