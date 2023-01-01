import usersModel from '../models/users.model'

async function findByPhoneNumber(phoneNumber: string) {
  return await usersModel
    .findOne({
      phoneNumber: phoneNumber,
    })
    .exec()
}

async function create(
  phoneNumber: string,
  payload: { name: string; email: string },
) {
  return await usersModel.create({
    phoneNumber: phoneNumber,
    name: payload.name,
    email: payload.email,
  })
}

async function update(
  userId: string,
  payload: { name: string; email: string },
) {
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
