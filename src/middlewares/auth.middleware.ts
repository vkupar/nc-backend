import { Response, Request, NextFunction } from 'express'
import userRepository from '../repositories/users.repository'
import getDecodedUser from '../utils/getDecodedUser'
import { HttpException } from '../utils/HttpException'

async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('Authorization')
    if (!token) {
      return next(new HttpException(401, 'Authorization token is missing'))
    }

    const decodedUser = await getDecodedUser(token)
    if (!decodedUser || !decodedUser.phone_number) {
      return next(new HttpException(401, 'Unauthorized'))
    }

    const user = await userRepository.findByPhoneNumber(
      decodedUser.phone_number,
    )

    req.user = {
      _id: user ? user._id : undefined,
      phoneNumber: decodedUser.phone_number,
      name: user ? user.name : undefined,
      email: user ? user.email : undefined,
    }

    next()
  } catch (error) {
    next(new HttpException(500, 'Someting went wrong'))
  }
}

export default authMiddleware
