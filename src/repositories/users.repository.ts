import usersModel from '../models/users.model'

const findByPhoneNumber = async (phoneNumber: string) => {
  return await usersModel
    .findOne({
      phoneNumber: phoneNumber,
    })
    .exec()
}

const create = async (
  phoneNumber: string,
  payload: { name: string; email: string },
) => {
  return await usersModel.create({
    phoneNumber: phoneNumber,
    name: payload.name,
    email: payload.email,
  })
}

const update = async (
  userId: string,
  payload: { name: string; email: string },
) => {
  return await usersModel
    .findOneAndUpdate(
      {
        _id: userId,
      },
      {
        name: payload.name,
        email: payload.email,
      },
      {
        new: true,
      },
    )
    .exec()
}

export default { findByPhoneNumber, create, update }
